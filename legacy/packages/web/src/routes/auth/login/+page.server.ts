// src/routes/auth/login/+page.server.ts
import { lucia } from '$lib/auth/lucia.js';
import { verifyPassword } from '$lib/auth/password.js';
import { userQueries } from '$lib/db/queries.ts'; // Fixed import
import { loginSchema } from '$lib/auth/validation.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(302, '/dashboard');
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return fail(400, {
        message: 'Invalid form data',
        errors: result.error.flatten().fieldErrors,
        data
      });
    }

    const { email, password } = result.data;

    try {
      console.log('🔍 Login attempt for:', email);
      
      // Check if userQueries is working
      console.log('📊 userQueries object:', typeof userQueries);
      
      const user = await userQueries.getByEmail(email);
      console.log('👤 User lookup result:', user ? 'Found' : 'Not found');
      
      if (!user) {
        return fail(400, {
          message: 'Invalid email or password',
          data
        });
      }

      console.log('🔐 Checking password...');
      const validPassword = await verifyPassword(user.passwordHash, password);
      console.log('✅ Password check:', validPassword ? 'Valid' : 'Invalid');
      
      if (!validPassword) {
        return fail(400, {
          message: 'Invalid email or password',
          data
        });
      }

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });

      console.log('✅ Login successful for:', email);

    } catch (error) {
      console.error('❌ Login error:', error.message);
      console.error('Full error:', error);
      
      return fail(500, {
        message: `Database error: ${error.message}`,
        data
      });
    }

    throw redirect(302, '/dashboard');
  }
};
