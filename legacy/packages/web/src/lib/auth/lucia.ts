// src/lib/auth/lucia.ts - Updated for Lucia 3.x
import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { getDB } from '../db/connection.js';
import { users, sessions } from '../db/schema.js';
import { dev } from '$app/environment';

const db = getDB();

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      displayName: attributes.display_name,
      role: attributes.role,
      communityId: attributes.community_id,
      didIdentifier: attributes.did_identifier
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      display_name: string | null;
      role: 'member' | 'community_weaver' | 'admin';
      community_id: string | null;
      did_identifier: string | null;
    };
  }
}
