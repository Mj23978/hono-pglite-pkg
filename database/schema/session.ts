import * as z from "zod"

export const sessionSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  /**
   * drizzle.default ../utils::updatedAt
   */
  updatedAt: z.date(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish(),
  userId: z.string(),
  impersonatedBy: z.string().nullish(),
  activeOrganizationId: z.string().nullish(),
})
