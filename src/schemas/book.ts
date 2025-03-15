import zod from "zod"

export const bookSchema = zod.object({
  "author": zod.string(),
  "cover_url": zod.string(),
  "genre": zod.string(),
  "id": zod.number(),
  "likes": zod.string(),
  "name": zod.string(),
  "quotes": zod.string(),
  "summary": zod.string(),
  "views": zod.string()
})

export type Book = zod.infer<typeof bookSchema>
