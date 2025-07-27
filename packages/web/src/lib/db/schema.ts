// src/lib/db/schema.ts
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Users table with simplified timestamps
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['member', 'community_weaver', 'admin'] }).default('member'),
  communityId: text('community_id'),
  
  // Future P2P migration field
  didIdentifier: text('did_identifier'),
  
  // Profile info
  displayName: text('display_name'),
  location: text('location'),
  
  // Simplified timestamps - store as milliseconds
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').notNull().$defaultFn(() => Date.now())
});

export const careActs = sqliteTable('care_acts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id),
  
  actType: text('act_type', { 
    enum: ['elders', 'childcare', 'ecological', 'cultural', 'community'] 
  }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  hours: real('hours').notNull(),
  impactScore: integer('impact_score').notNull(),
  
  location: text('location'),
  
  heartsEarned: integer('hearts_earned'),
  leavesEarned: integer('leaves_earned'),
  culturalMultiplier: real('cultural_multiplier').default(1.0),
  greenJobScore: real('green_job_score').default(1.0),
  
  validationStatus: text('validation_status', { 
    enum: ['pending', 'validated', 'rejected', 'community_review'] 
  }).default('pending'),
  communityWeaverId: text('community_weaver_id').references(() => users.id),
  validatedAt: integer('validated_at'), // Simplified timestamp
  
  evidence: text('evidence'),
  metadata: text('metadata'),
  
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').notNull().$defaultFn(() => Date.now())
});

export const heartsBalances = sqliteTable('hearts_balances', {
  userId: text('user_id').primaryKey().references(() => users.id),
  totalHearts: integer('total_hearts').default(0),
  totalLeaves: integer('leaves_earned').default(0),
  monthlyHearts: integer('monthly_hearts').default(0),
  
  aubiBonus: integer('aubi_bonus').default(0),
  
  loveScore: real('love_score').default(0),
  meaningScore: real('meaning_score').default(0),
  connectionScore: real('connection_score').default(0),
  
  lastUpdated: integer('last_updated').notNull().$defaultFn(() => Date.now())
});

export const validationRecords = sqliteTable('validation_records', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  careActId: text('care_act_id').notNull().references(() => careActs.id),
  validatorId: text('validator_id').notNull().references(() => users.id),
  
  decision: text('decision', { enum: ['approve', 'reject', 'request_changes'] }).notNull(),
  feedback: text('feedback'),
  culturalProtocol: text('cultural_protocol'),
  
  consensusWeight: real('consensus_weight').default(1.0),
  
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now())
});

// Auth sessions - simplified for Lucia
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  expiresAt: integer('expires_at').notNull() // No timestamp mode
});

// Type exports remain the same
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CareAct = typeof careActs.$inferSelect;
export type NewCareAct = typeof careActs.$inferInsert;
export type HeartsBalance = typeof heartsBalances.$inferSelect;
export type ValidationRecord = typeof validationRecords.$inferSelect;
