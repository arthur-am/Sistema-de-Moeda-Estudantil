import { user } from '../auth-schema';
import { eq } from 'drizzle-orm';

/**
 * Helper to insert an entity and set the user's role in the same transaction.
 * insertFn should perform the insert using the provided transaction `tx`.
 */
export async function createAndAssignRole(tx: any, insertFn: () => Promise<any>, userId: string, role: string) {
  await insertFn();
  return await tx.update(user).set({ role }).where(eq(user.id, userId)).returning();
}
