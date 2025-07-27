// love-ledger/src/index.js
import { validateUnified } from '@bjornkennethholmstrom/ggf-core';

/**
 * Love Ledger Core - Hearts and Leaves calculation engine
 */

// Configuration constants
export const HEARTS_CONFIG = {
  BASE_RATE: 10,               // Base Hearts per hour
  MAX_CULTURAL_MULTIPLIER: 2.0,
  MIN_CULTURAL_MULTIPLIER: 0.5,
  GREEN_JOB_MIN: 1.0,
  GREEN_JOB_MAX: 1.5
};

export const LEAVES_CONFIG = {
  BASE_RATE: 2,                // Base Leaves per hour of ecological work
  ECOLOGICAL_ACTS: ['ecological'] // Match unified schema exactly
};

/**
 * Calculate Hearts earned for a care act
 * Formula: hours × impact_score × base_rate × multipliers
 */
export function calculateHearts(careAct, options = {}) {
  const {
    hours = 0,
    impact_score = 1,
    act_type = 'community'
  } = careAct;

  const {
    cultural_multiplier = 1.0,
    green_job_score = 1.0,
    base_rate = HEARTS_CONFIG.BASE_RATE
  } = options;

  // Validate inputs
  if (hours < 0 || hours > 24) {
    throw new Error('Hours must be between 0 and 24');
  }
  
  if (impact_score < 1 || impact_score > 5) {
    throw new Error('Impact score must be between 1 and 5');
  }

  if (cultural_multiplier < HEARTS_CONFIG.MIN_CULTURAL_MULTIPLIER || 
      cultural_multiplier > HEARTS_CONFIG.MAX_CULTURAL_MULTIPLIER) {
    throw new Error(`Cultural multiplier must be between ${HEARTS_CONFIG.MIN_CULTURAL_MULTIPLIER} and ${HEARTS_CONFIG.MAX_CULTURAL_MULTIPLIER}`);
  }

  // Calculate base Hearts
  let hearts = hours * impact_score * base_rate;

  // Apply cultural multiplier
  hearts *= cultural_multiplier;

  // Apply green job score for ecological work
  if (LEAVES_CONFIG.ECOLOGICAL_ACTS.includes(act_type)) {
    hearts *= green_job_score;
  }

  return Math.round(hearts);
}

/**
 * Calculate Leaves NFTs earned for ecological work
 */
export function calculateLeaves(ecoAct, options = {}) {
  const {
    hours = 0,
    impact_score = 1,
    act_type = 'ecological',
    location = {}
  } = ecoAct;

  const {
    base_rate = LEAVES_CONFIG.BASE_RATE
  } = options;

  // Only ecological acts earn Leaves
  if (!LEAVES_CONFIG.ECOLOGICAL_ACTS.includes(act_type)) {
    return null;
  }

  const leaves_amount = Math.floor(hours * impact_score * base_rate);

  return {
    amount: leaves_amount,
    nft_metadata: {
      gps: location.gps || 'unknown',
      eco_act: act_type,
      impact_measurement: `${hours}h_impact${impact_score}`,
      timestamp: new Date().toISOString(),
      carbon_offset_estimate: leaves_amount * 0.1 // kg CO2
    }
  };
}

/**
 * Create a complete care act record with Hearts/Leaves calculation
 */
export function createCareAct(actData, validationData = {}, calculationOptions = {}) {
  const careAct = {
    id: actData.id || `care_act_${Date.now()}`,
    act_type: actData.act_type,
    title: actData.title,
    agent: actData.agent,
    recipient: actData.recipient || 'community',
    hours: actData.hours,
    impact_score: actData.impact_score,
    timestamp: actData.timestamp || new Date().toISOString(),
    location: actData.location || {},
    validation: {
      validated_at: new Date().toISOString(),
      ...validationData
    },
    evidence: actData.evidence || {}
  };

  // Calculate Hearts
  const hearts = calculateHearts(careAct, calculationOptions);
  careAct.hearts_calculation = {
    base_hearts: careAct.hours * careAct.impact_score * HEARTS_CONFIG.BASE_RATE,
    cultural_multiplier: calculationOptions.cultural_multiplier || 1.0,
    green_job_score: calculationOptions.green_job_score || 1.0,
    total_hearts: hearts
  };

  // Calculate Leaves for ecological work
  const leaves = calculateLeaves(careAct, calculationOptions);
  if (leaves) {
    careAct.leaves_earned = leaves;
  }

  return careAct;
}

/**
 * Create Hearts allocation record
 */
export function createHeartsAllocation(careActId, recipient, heartsAmount, calculationMethod, context = {}) {
  return {
    allocation_id: `hearts_${Date.now()}`,
    care_act_id: careActId,
    recipient: recipient,
    hearts_amount: heartsAmount,
    calculation_method: calculationMethod,
    allocation_date: new Date().toISOString(),
    community_context: context.community || {},
    aubi_integration: {
      layer: 2, // Contribution bonus
      monthly_bonus: heartsAmount
    },
    status: 'pending'
  };
}

/**
 * Validate care act against Love Ledger standards
 */
export function validateCareAct(careAct) {
  // Use ggf-core unified schema for validation
  const isValid = validateUnified({
    operation: 'sense', // Mock operation for validation
    timestamp: careAct.timestamp,
    agent: careAct.agent,
    care_metrics: {
      act_type: careAct.act_type,
      hours: careAct.hours,
      impact_score: careAct.impact_score
    }
  });

  if (!isValid) {
    return {
      valid: false,
      errors: validateUnified.errors
    };
  }

  // Additional Love Ledger specific validation
  const errors = [];

  if (!careAct.validation || !careAct.validation.validated_at) {
    errors.push('Care act must include validation timestamp');
  }

  if (careAct.act_type === 'ecological' && !careAct.location?.gps) {
    errors.push('Ecological acts must include GPS location');
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Calculate monthly AUBI bonus from accumulated Hearts
 */
export function calculateAUBIBonus(heartsBalance, community_multiplier = 1.0) {
  // Simple conversion: 1 Heart = $1 in AUBI Layer 2 bonus
  return Math.round(heartsBalance * community_multiplier);
}

/**
 * Community Weaver helpers
 */
export const CommunityWeaver = {
  /**
   * Validate a care act as a Community Weaver
   */
  validateAct(careAct, weaverDid, culturalProtocol = 'peer_consensus') {
    const validation = {
      community_weaver: weaverDid,
      cultural_protocol: culturalProtocol,
      validated_at: new Date().toISOString()
    };

    return {
      ...careAct,
      validation: { ...careAct.validation, ...validation }
    };
  },

  /**
   * Set cultural multiplier for Hearts calculation
   */
  setCulturalMultiplier(act_type, community_context) {
    // Default multipliers by act type and community context
    const multipliers = {
      elders: { default: 1.2, indigenous: 1.5 }, // Match schema
      childcare: { default: 1.1, indigenous: 1.3 },
      ecological: { default: 1.0, indigenous: 1.4 }
    };

    const context = community_context?.cultural_type || 'default';
    return multipliers[act_type]?.[context] || 1.0;
  }
};

// Export configuration for external use
// export { HEARTS_CONFIG, LEAVES_CONFIG };
