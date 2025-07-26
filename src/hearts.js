// love-ledger/src/hearts.js
import { unifiedSchema } from '@bjornkennethholmstrom/ggf-core';

export function calculateHearts(careAct) {
  // Basic Hearts calculation: hours * impact_score * 10
  return careAct.hours * careAct.impact_score * 10;
}

export function createLeavesNFT(ecoAct) {
  return {
    amount: Math.floor(ecoAct.hours * 2),
    nft_metadata: {
      gps: ecoAct.location?.gps,
      eco_act: ecoAct.act_type,
      timestamp: new Date().toISOString()
    }
  };
}
