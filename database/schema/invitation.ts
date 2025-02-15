import * as z from "zod"

export const invitationSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().nullish(),
  status: z.string(),
  expiresAt: z.date(),
  inviterId: z.string(),
})
