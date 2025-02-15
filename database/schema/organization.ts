import * as z from "zod"

export const organizationSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  name: z.string(),
  logo: z.string().nullish(),
  currency: z.string(),
  slug: z.string().nullish(),
  locale: z.string(),
  createdAt: z.date(),
  /**
   * drizzle.default ../utils::updatedAt
   */
  updatedAt: z.date(),
  metadata: z.string().nullish(),
})
