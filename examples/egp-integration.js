#!/usr/bin/env node
// love-ledger/examples/egp-integration.js
// Demonstrates how Love Ledger extends EGP governance operations

import { validateUnified } from '@bjornkennethholmstrom/ggf-core';
import { calculateHearts, calculateLeaves, CommunityWeaver } from '../src/index.js';

console.log('🏛️💚 EGP + Love Ledger Integration Demo\n');

/**
 * Scenario: Community water crisis resolved through care economy
 * Shows complete sense() → propose() → adopt() cycle with Hearts/Leaves
 */

// Step 1: sense() with care gap detection
console.log('1️⃣ SENSE: Community detects elder isolation during water crisis');

const senseWithCare = {
  operation: "sense",
  timestamp: "2025-07-25T14:30:00Z",
  agent: "did:example:maria",
  location: { 
    gps: "35.6812,-105.9056", 
    community_id: "baz:taos" 
  },
  content: {
    description: "Elder José isolated for 3 days due to water shortage",
    evidence: ["ipfs://QmXyZ..."]
  },
  // Love Ledger extension: identifies care gap
  care_metrics: {
    act_type: "elders",
    hours: 0, // No care happening yet - this is the problem!
    impact_score: 3 // Moderate crisis
  },
  // No Hearts earned yet - this flags the need for care
  currency_alloc: {
    hearts: 0,
    leaves: null
  }
};

const senseValid = validateUnified(senseWithCare);
console.log('Sense with care gap valid:', senseValid ? '✅' : '❌');
if (!senseValid) {
  console.log('Sense validation errors:', validateUnified.errors);
}

console.log('🔍 Care gap detected: Elder José needs daily check-ins');
console.log('💡 Love Ledger suggests: Propose care solution with Hearts incentive');
console.log('');

// Step 2: propose() with Hearts-funded solution
console.log('2️⃣ PROPOSE: Community Weaver proposes Hearts-incentivized care');

const proposeWithHearts = {
  operation: "propose",
  timestamp: "2025-07-25T15:00:00Z",
  agent: "did:example:weaver_rosa",
  location: { community_id: "baz:taos" },
  content: {
    description: "Daily elder check-ins by volunteers with Hearts rewards",
    evidence: ["ipfs://QmAbC..."]
  },
  // Love Ledger extension: care solution with Hearts incentive
  care_metrics: {
    act_type: "elders",
    hours: 1, // 1 hour daily check-ins
    impact_score: 4 // High community impact
  },
  currency_alloc: {
    hearts: 48, // Hearts per check-in (1h × 4 impact × 10 base × 1.2 cultural)
    leaves: null
  },
  // AUBI integration: Hearts count as Layer 2 bonuses
  aubi_integration: {
    layer: 2,
    sunset_clause: "P3M" // 3-month trial
  }
};

const proposeValid = validateUnified(proposeWithHearts);
console.log('Propose with Hearts incentive valid:', proposeValid ? '✅' : '❌');
if (!proposeValid) {
  console.log('Propose validation errors:', validateUnified.errors);
}

// Calculate Hearts for the proposed care work
const proposedCare = {
  hours: 1,
  impact_score: 4,
  act_type: 'elders' // Match schema
};

const heartsPerVisit = calculateHearts(proposedCare, { cultural_multiplier: 1.2 });
console.log(`💚 Hearts per elder visit: ${heartsPerVisit}`);
console.log('🌍 AUBI Layer 2 bonus: +$48/month for care provider');
console.log('');

// Step 3: adopt() with community validation
console.log('3️⃣ ADOPT: Elder Council adopts care program with Hearts funding');

const adoptWithValidation = {
  operation: "adopt",
  timestamp: "2025-07-25T16:00:00Z", 
  agent: "baz:taos_elder_council",
  location: { gps: "35.6812,-105.9056" },
  content: {
    description: "Adopted elder care program with Hearts incentives",
    evidence: ["ipfs://QmDeF..."]
  },
  // Love Ledger extension: validates care approach
  care_metrics: {
    act_type: "elders",
    hours: 7, // 7 volunteers × 1 hour each per week
    impact_score: 5 // Maximum impact - addresses crisis
  },
  currency_alloc: {
    hearts: 420, // Weekly Hearts budget (7 × 48 + community bonus)
    leaves: null
  },
  // AUBI integration: community care program
  aubi_integration: {
    layer: 2,
    sunset_clause: "P6M" // Extended to 6 months
  }
};

const adoptValid = validateUnified(adoptWithValidation);
console.log('Adopt with community validation valid:', adoptValid ? '✅' : '❌');
if (!adoptValid) {
  console.log('Adopt validation errors:', validateUnified.errors);
}

console.log('🤝 Elder Council decision: Elder care program approved');
console.log('💰 Hearts budget: 420 Hearts/week for volunteer care providers');
console.log('⏰ Trial period: 6 months with 2-week reviews');
console.log('');

// Step 4: Love Ledger logging actual care delivery
console.log('4️⃣ CARE DELIVERY: Love Ledger tracks actual care contributions');

const actualCareActs = [
  {
    volunteer: "did:example:maria",
    elder: "elder_jose",
    hours: 1.5,
    date: "2025-07-26",
    activities: ["wellness_check", "medication_reminder", "social_visit"]
  },
  {
    volunteer: "did:example:carlos",
    elder: "elder_ana",
    hours: 1,
    date: "2025-07-26", 
    activities: ["grocery_delivery", "water_distribution"]
  }
];

let totalHeartsDistributed = 0;

actualCareActs.forEach((act, index) => {
  const hearts = calculateHearts({
    hours: act.hours,
    impact_score: 4,
    act_type: 'elders' // Match schema
  }, { cultural_multiplier: 1.2 });

  totalHeartsDistributed += hearts;

  console.log(`Care Act ${index + 1}:`);
  console.log(`  Volunteer: ${act.volunteer}`);
  console.log(`  Elder: ${act.elder}`);
  console.log(`  Hours: ${act.hours}`);
  console.log(`  Hearts earned: ${hearts} 💚`);
  console.log(`  AUBI bonus: +$${hearts} this month`);
});

console.log('');
console.log(`Total Hearts distributed: ${totalHeartsDistributed} 💚`);
console.log(`Total AUBI Layer 2 bonuses: $${totalHeartsDistributed}`);
console.log('');

// Step 5: Community Weaver validation
console.log('5️⃣ VALIDATION: Community Weaver validates cultural appropriateness');

const weaverValidation = CommunityWeaver.validateAct(
  {
    act_type: 'elders', // Match schema
    title: 'Elder José daily wellness check',
    hours: 1.5,
    impact_score: 4,
    validation: {}
  },
  'did:example:weaver_rosa',
  'elder_council_blessing'
);

console.log('Community Weaver validation ✅');
console.log(`Protocol: ${weaverValidation.validation.cultural_protocol}`);
console.log(`Weaver: ${weaverValidation.validation.community_weaver}`);
console.log('');

// Step 6: Results and learnings
console.log('6️⃣ RESULTS: Love Ledger + EGP creates care economy success');

console.log('📊 Outcomes after 1 week:');
console.log('  • Elder isolation crisis resolved ✅');
console.log('  • 7 volunteers actively providing care ✅');
console.log('  • 420 Hearts circulating in care economy ✅');
console.log('  • $420 in AUBI Layer 2 bonuses distributed ✅');
console.log('  • Community bonds strengthened ✅');
console.log('');

console.log('🔄 EGP + Love Ledger Integration Flow:');
console.log('  1. EGP sense() detects systemic issues');
console.log('  2. Love Ledger identifies care gaps and rewards');
console.log('  3. EGP propose() suggests Hearts-funded solutions');
console.log('  4. EGP adopt() implements care programs');
console.log('  5. Love Ledger tracks and validates contributions');
console.log('  6. AUBI distributes economic benefits');
console.log('  7. Community resilience increases');
console.log('');

console.log('🎉 Integration Demo Complete!');
console.log('Love Ledger extends EGP with care economy superpowers! 💚🏛️');
