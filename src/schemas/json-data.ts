import {bookSchema} from "./book"
import {topBannerSlideSchema} from "./top-banner-slide"

import zod from "zod"

export const JsonDataSchema = zod.object({
  books: bookSchema.array(),
  top_banner_slides: topBannerSlideSchema.array(),
  you_will_like_section: zod.array(zod.number())
})

export type JsonData = zod.infer<typeof JsonDataSchema>
