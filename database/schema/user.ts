import * as z from "zod"

export const userSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  username: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  role: z.string(),
  twoFactorEnabled: z.boolean(),
  locale: z.string(),
  image: z.string().nullish(),
  banned: z.boolean(),
  banReason: z.string().nullish(),
  banExpires: z.date().nullish(),
  lastNotificationCheck: z.date().nullish(),
  createdAt: z.date(),
  /**
   * drizzle.default ../utils::updatedAt
   */
  updatedAt: z.date(),
})
