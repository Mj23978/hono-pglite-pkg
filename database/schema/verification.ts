import * as z from "zod"

export const verificationSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  /**
   * drizzle.default ../utils::updatedAt
   */
  updatedAt: z.date(),
})
