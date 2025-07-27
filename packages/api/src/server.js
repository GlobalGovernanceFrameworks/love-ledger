// packages/api/src/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import {
  calculateHearts,
  calculateLeaves,
  createCareAct,
  createHeartsAllocation,
  validateCareAct,
  calculateAUBIBonus,
  CommunityWeaver
} from './index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Love Ledger API',
    version: '1.1.0',
    timestamp: new Date().toISOString()
  });
});

// API Info
app.get('/api', (req, res) => {
  res.json({
    name: 'Love Ledger API',
    description: 'Hearts and Leaves calculation engine for the care economy',
    version: '1.1.0',
    endpoints: {
      'POST /api/care-acts': 'Create and validate care acts',
      'POST /api/calculate-hearts': 'Calculate Hearts for care contributions',
      'POST /api/calculate-leaves': 'Calculate Leaves for ecological work',
      'POST /api/validate-care': 'Validate care act data',
      'GET /api/user/:did/balance': 'Get user Hearts/Leaves balance',
      'POST /api/community-weaver/validate': 'Community Weaver validation'
    }
  });
});

// Calculate Hearts for care contribution
app.post('/api/calculate-hearts', (req, res) => {
  try {
    const { hours, impact_score, act_type } = req.body;
    const options = req.body.options || {};
    
    const hearts = calculateHearts({ hours, impact_score, act_type }, options);
    
    res.json({
      hearts,
      calculation: {
        hours,
        impact_score,
        act_type,
        options,
        formula: `${hours} hours × ${impact_score} impact × ${options.base_rate || 10} base × ${options.cultural_multiplier || 1.0} cultural`
      }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Calculation Error',
      message: error.message
    });
  }
});

// Calculate Leaves for ecological work
app.post('/api/calculate-leaves', (req, res) => {
  try {
    const ecoAct = req.body;
    const options = req.body.options || {};
    
    const leaves = calculateLeaves(ecoAct, options);
    
    res.json({
      leaves,
      ecological_work: leaves !== null
    });
  } catch (error) {
    res.status(400).json({
      error: 'Calculation Error',
      message: error.message
    });
  }
});

// Create and validate care act
app.post('/api/care-acts', (req, res) => {
  try {
    const { actData, validationData, calculationOptions } = req.body;
    
    // Create complete care act
    const careAct = createCareAct(actData, validationData, calculationOptions);
    
    // Validate care act
    const validation = validateCareAct(careAct);
    
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Care act failed validation',
        errors: validation.errors
      });
    }
    
    // Create Hearts allocation
    const allocation = createHeartsAllocation(
      careAct.id,
      careAct.agent,
      careAct.hearts_calculation.total_hearts,
      careAct.hearts_calculation,
      { community: { community_id: actData.location?.community_id } }
    );
    
    res.status(201).json({
      care_act: careAct,
      hearts_allocation: allocation,
      validation
    });
  } catch (error) {
    res.status(400).json({
      error: 'Care Act Creation Error',
      message: error.message
    });
  }
});

// Validate care act data
app.post('/api/validate-care', (req, res) => {
  try {
    const careAct = req.body;
    const validation = validateCareAct(careAct);
    
    res.json(validation);
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message
    });
  }
});

// Get user balance (mock implementation)
app.get('/api/user/:did/balance', (req, res) => {
  const { did } = req.params;
  
  // In a real implementation, this would query a database
  // For now, return mock data
  const mockBalance = {
    user_did: did,
    hearts_balance: 247,
    leaves_balance: 15,
    monthly_hearts_earned: 89,
    total_care_hours: 24.5,
    last_updated: new Date().toISOString(),
    recent_activities: [
      {
        id: 'care_act_001',
        type: 'elders',
        hearts_earned: 48,
        date: '2025-07-25'
      },
      {
        id: 'care_act_002', 
        type: 'ecological',
        hearts_earned: 42,
        leaves_earned: 8,
        date: '2025-07-24'
      }
    ]
  };
  
  res.json(mockBalance);
});

// Community Weaver validation
app.post('/api/community-weaver/validate', (req, res) => {
  try {
    const { careAct, weaverDid, culturalProtocol } = req.body;
    
    const validatedAct = CommunityWeaver.validateAct(careAct, weaverDid, culturalProtocol);
    
    res.json({
      validated_care_act: validatedAct,
      weaver: weaverDid,
      protocol: culturalProtocol,
      validated_at: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({
      error: 'Weaver Validation Error',
      message: error.message
    });
  }
});

// AUBI bonus calculation
app.post('/api/aubi/calculate-bonus', (req, res) => {
  try {
    const { heartsBalance, communityMultiplier } = req.body;
    
    const bonus = calculateAUBIBonus(heartsBalance, communityMultiplier);
    
    res.json({
      hearts_balance: heartsBalance,
      community_multiplier: communityMultiplier || 1.0,
      monthly_aubi_bonus: bonus,
      layer: 2 // AUBI Layer 2 (Contribution Bonus)
    });
  } catch (error) {
    res.status(400).json({
      error: 'AUBI Calculation Error',
      message: error.message
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    available_endpoints: [
      'GET /health',
      'GET /api',
      'POST /api/calculate-hearts',
      'POST /api/calculate-leaves',
      'POST /api/care-acts',
      'POST /api/validate-care',
      'GET /api/user/:did/balance',
      'POST /api/community-weaver/validate',
      'POST /api/aubi/calculate-bonus'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`💚 Love Ledger API running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API info: http://localhost:${PORT}/api`);
  console.log('🍃 Ready to track Hearts and Leaves!');
});

export default app;
