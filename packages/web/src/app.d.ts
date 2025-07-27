// src/app.d.ts - Updated types for Lucia 3.x
import type { User, Session } from 'lucia';

declare global {
  namespace App {
    interface Locals {
      user: User | null;
      session: Session | null;
    }
  }
}

export {};
