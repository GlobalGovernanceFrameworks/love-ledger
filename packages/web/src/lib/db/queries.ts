// src/lib/db/queries.ts - Updated for latest Drizzle
import { eq, desc } from 'drizzle-orm';
import { getDB } from './connection.js';
import { users, careActs, heartsBalances, validationRecords } from './schema.js';
import type { User, CareAct, NewCareAct } from './schema.js';

export const userQueries = {
  async getByEmail(email: string): Promise<User | null> {
    const db = getDB();
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] ?? null;
  },

  async getById(id: string): Promise<User | null> {
    const db = getDB();
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] ?? null;
  },

  async create(userData: {
    email: string;
    passwordHash: string;
    displayName?: string;
    communityId?: string;
  }) {
    const db = getDB();
    
    // Explicitly set timestamps
    const now = new Date();
    const userToInsert = {
      ...userData,
      displayName: userData.displayName || null,
      communityId: userData.communityId || null,
      // Let schema handle timestamps automatically
    };
    
    const result = await db.insert(users).values(userToInsert).returning();
    
    // Initialize Hearts balance with explicit timestamp
    await db.insert(heartsBalances).values({
      userId: result[0].id,
      totalHearts: 0,
      totalLeaves: 0,
      monthlyHearts: 0,
      // Let schema handle timestamps automatically
    });
    
    return result[0];
  }
};

export const careActQueries = {
  async create(careActData: NewCareAct): Promise<CareAct> {
    const db = getDB();
    const result = await db.insert(careActs).values(careActData).returning();
    return result[0];
  },

  async getByUser(userId: string): Promise<CareAct[]> {
    const db = getDB();
    return await db
      .select()
      .from(careActs)
      .where(eq(careActs.userId, userId))
      .orderBy(desc(careActs.createdAt));
  },

  async getPendingValidations(): Promise<CareAct[]> {
    const db = getDB();
    return await db
      .select()
      .from(careActs)
      .where(eq(careActs.validationStatus, 'pending'))
      .orderBy(careActs.createdAt);
  }
};

export const heartsQueries = {
  async getBalance(userId: string) {
    const db = getDB();
    const result = await db
      .select()
      .from(heartsBalances)
      .where(eq(heartsBalances.userId, userId))
      .limit(1);
    return result[0] ?? null;
  },

  async updateBalance(userId: string, heartsToAdd: number, leavesToAdd: number = 0) {
    const db = getDB();
    const current = await this.getBalance(userId);
    
    if (!current) {
      return await db.insert(heartsBalances).values({
        userId,
        totalHearts: heartsToAdd,
        totalLeaves: leavesToAdd,
        monthlyHearts: heartsToAdd
      });
    }

    return await db
      .update(heartsBalances)
      .set({
        totalHearts: current.totalHearts + heartsToAdd,
        totalLeaves: (current.totalLeaves ?? 0) + leavesToAdd,
        monthlyHearts: current.monthlyHearts + heartsToAdd,
        lastUpdated: new Date()
      })
      .where(eq(heartsBalances.userId, userId));
  }
};
