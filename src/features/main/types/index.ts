import {Book} from "@/schemas/book"

export interface GenreListItem {
  genre: string
  books: Book[]
}
