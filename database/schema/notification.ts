import * as z from "zod"

export const notificationSchema = z.object({
  /**
   * drizzle.default @paralleldrive/cuid2::createId
   */
  id: z.string(),
  type: z.string(),
  message: z.string(),
  data: z.string(),
  isRead: z.boolean(),
  createdAt: z.date(),
  /**
   * drizzle.default ../utils::updatedAt
   */
  updatedAt: z.date(),
  userId: z.string(),
})
