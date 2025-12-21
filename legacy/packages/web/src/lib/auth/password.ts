// src/lib/auth/password.ts - Updated for latest @node-rs/argon2
import { hash, verify } from '@node-rs/argon2';

const hashOptions = {
  memoryCost: 65536, // 64 MB
  timeCost: 3,      // 3 iterations
  outputLen: 32,    // 32 bytes output
  parallelism: 4,   // 4 threads
};

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, hashOptions);
}

export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
  return await verify(hashedPassword, password);
}
