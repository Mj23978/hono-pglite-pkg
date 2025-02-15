import * as z from "zod"

export const twoFactorSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string(),
})
