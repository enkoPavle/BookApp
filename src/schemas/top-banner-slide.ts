import zod from "zod"

export const topBannerSlideSchema = zod.object({
  book_id: zod.number(),
  cover: zod.string(),
  id: zod.number()
})
