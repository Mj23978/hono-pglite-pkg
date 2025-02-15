import * as z from "zod"

export const accountSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullish(),
  refreshToken: z.string().nullish(),
  idToken: z.string().nullish(),
  accessTokenExpiresAt: z.date().nullish(),
  refreshTokenExpiresAt: z.date().nullish(),
  scope: z.string().nullish(),
  password: z.string().nullish(),
  createdAt: z.date(),
  /**
   * drizzle.default ../utils::updatedAt
   */
  updatedAt: z.date(),
})
