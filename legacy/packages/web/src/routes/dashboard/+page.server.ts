// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { userQueries } from '$lib/db/queries';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/auth/login');
  }

  // Make sure we're getting the full user data including displayName
  const user = await userQueries.getById(locals.user.id);
  
  // Your other data loading...
  const heartsBalance = {
    totalHearts: 1250,
    totalLeaves: 45,
    monthlyHearts: 320,
    aubiBonus: 125,
    loveScore: 0.75,
    meaningScore: 0.68,
    connectionScore: 0.82
  };

  const recentCareActs = [];
  const stats = {};

  return {
    user, // This should include displayName
    heartsBalance,
    recentCareActs,
    stats
  };
};
