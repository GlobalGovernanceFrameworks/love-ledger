// src/routes/auth/logout/+page.server.ts
import { lucia } from '$lib/auth/lucia.ts';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    if (!locals.session) throw redirect(302, '/auth/login');

    await lucia.invalidateSession(locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    throw redirect(302, '/');
  }
};
