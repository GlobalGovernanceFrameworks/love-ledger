// src/routes/auth/register/+page.server.ts
import { lucia } from '$lib/auth/lucia.ts';
import { hashPassword } from '$lib/auth/password.ts';
import { userQueries } from '$lib/db/queries.ts';
import { registerSchema } from '$lib/auth/validation.ts';
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

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      return fail(400, {
        message: 'Invalid form data',
        errors: result.error.flatten().fieldErrors,
        data
      });
    }

    const { email, password, displayName, communityId } = result.data;

    try {
      const existingUser = await userQueries.getByEmail(email);
      if (existingUser) {
        return fail(400, {
          message: 'An account with this email already exists',
          data
        });
      }

      const passwordHash = await hashPassword(password);
      const user = await userQueries.create({
        email,
        passwordHash,
        displayName,
        communityId: communityId || null
      });

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });

    } catch (error) {
      console.error('Registration error:', error);
      return fail(500, {
        message: 'Failed to create account'
      });
    }

    throw redirect(302, '/dashboard');
  }
};
