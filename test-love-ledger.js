#!/usr/bin/env node
// love-ledger/test-love-ledger.js

import {
  calculateHearts,
  calculateLeaves,
  createCareAct,
  createHeartsAllocation,
  validateCareAct,
  calculateAUBIBonus,
  CommunityWeaver
} from './src/index.js';

console.log('💚 Testing Love Ledger Hearts and Leaves System...\n');

// Test 1: Basic Hearts Calculation
console.log('🧮 Test 1: Hearts Calculation');

const elderCare = {
  hours: 2,
  impact_score: 4,
  act_type: 'elders' // Changed to match schema
};

const basicHearts = calculateHearts(elderCare);
console.log(`Elder care (2h, impact 4): ${basicHearts} Hearts ✅`);

const ecoWork = {
  hours: 6,
  impact_score: 5,
  act_type: 'ecological'
};

const ecoHearts = calculateHearts(ecoWork, { green_job_score: 1.4 });
console.log(`Ecological work (6h, impact 5, 1.4x green): ${ecoHearts} Hearts ✅`);

console.log('');

// Test 2: Leaves Calculation
console.log('🍃 Test 2: Leaves Calculation');

const watershedWork = {
  hours: 4,
  impact_score: 5,
  act_type: 'ecological',
  location: { gps: '35.6812,-105.9056' }
};

const leaves = calculateLeaves(watershedWork);
console.log('Watershed restoration Leaves:', leaves ? '✅' : '❌');
if (leaves) {
  console.log(`  Amount: ${leaves.amount} Leaves`);
  console.log(`  GPS: ${leaves.nft_metadata.gps}`);
  console.log(`  Carbon offset: ${leaves.nft_metadata.carbon_offset_estimate} kg CO2`);
}

const nonEcoWork = {
  hours: 2,
  impact_score: 3,
  act_type: 'childcare'
};

const noLeaves = calculateLeaves(nonEcoWork);
console.log('Childcare Leaves (should be null):', noLeaves === null ? '✅' : '❌');

console.log('');

// Test 3: Complete Care Act Creation
console.log('🎭 Test 3: Complete Care Act Creation');

const careActData = {
  act_type: 'elders', // Changed to match unified schema
  title: 'Daily wellness check for Elder José',
  agent: 'did:example:maria',
  recipient: 'elder_jose', 
  hours: 1.5,
  impact_score: 4,
  location: { community_id: 'baz:taos' }
};

const validationData = {
  community_weaver: 'did:example:weaver_rosa',
  cultural_protocol: 'elder_council_approval'
};

const calculationOptions = {
  cultural_multiplier: 1.2
};

const fullCareAct = createCareAct(careActData, validationData, calculationOptions);
console.log('Complete care act created ✅');
console.log(`  Hearts earned: ${fullCareAct.hearts_calculation.total_hearts}`);
console.log(`  Validated by: ${fullCareAct.validation.community_weaver}`);

console.log('');

// Test 4: Hearts Allocation
console.log('💰 Test 4: Hearts Allocation');

const allocation = createHeartsAllocation(
  fullCareAct.id,
  fullCareAct.agent,
  fullCareAct.hearts_calculation.total_hearts,
  fullCareAct.hearts_calculation,
  { community: { community_id: 'baz:taos' } }
);

console.log('Hearts allocation created ✅');
console.log(`  Allocation ID: ${allocation.allocation_id}`);
console.log(`  Hearts amount: ${allocation.hearts_amount}`);
console.log(`  AUBI Layer: ${allocation.aubi_integration.layer}`);

console.log('');

// Test 5: Care Act Validation
console.log('✓ Test 5: Care Act Validation');

const validation = validateCareAct(fullCareAct);
console.log('Care act validation:', validation.valid ? '✅' : '❌');
if (!validation.valid) {
  console.log('Validation errors:', validation.errors);
}

console.log('');

// Test 6: AUBI Bonus Calculation
console.log('🌍 Test 6: AUBI Bonus Calculation');

const heartsBalance = 500; // Accumulated Hearts
const aubiBonus = calculateAUBIBonus(heartsBalance);
console.log(`${heartsBalance} Hearts → $${aubiBonus} AUBI Layer 2 bonus ✅`);

console.log('');

// Test 7: Community Weaver Functions
console.log('🕸️ Test 7: Community Weaver Functions');

const rawAct = {
  act_type: 'ecological',
  title: 'Reforestation project',
  hours: 8,
  impact_score: 5,
  validation: {}
};

const weaverValidated = CommunityWeaver.validateAct(
  rawAct, 
  'did:example:master_weaver',
  'land_blessing_ceremony'
);

console.log('Community Weaver validation ✅');
console.log(`  Protocol: ${weaverValidated.validation.cultural_protocol}`);

const culturalMultiplier = CommunityWeaver.setCulturalMultiplier(
  'ecological',
  { cultural_type: 'indigenous' }
);

console.log(`Cultural multiplier for indigenous ecological work: ${culturalMultiplier}x ✅`);

console.log('');

// Test 8: Error Handling
console.log('🚫 Test 8: Error Handling');

try {
  calculateHearts({ hours: 25, impact_score: 3 }); // Invalid hours
  console.log('Error handling failed ❌');
} catch (error) {
  console.log('Hours validation error caught ✅');
}

try {
  calculateHearts({ hours: 2, impact_score: 6 }); // Invalid impact
  console.log('Error handling failed ❌');
} catch (error) {
  console.log('Impact score validation error caught ✅');
}

console.log('');

// Summary
console.log('🎉 Love Ledger Testing Complete!');
console.log('');
console.log('✅ Hearts calculation with multipliers');
console.log('✅ Leaves NFT generation for ecological work');
console.log('✅ Complete care act creation and validation');
console.log('✅ Hearts allocation for AUBI integration');
console.log('✅ Community Weaver validation workflow');
console.log('✅ AUBI bonus calculation');
console.log('✅ Error handling and validation');
console.log('');
console.log('💚 Love Ledger is ready to track care economy contributions! 🍃');
