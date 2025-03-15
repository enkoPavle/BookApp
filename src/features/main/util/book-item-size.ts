import {Dimensions} from "react-native"

const {width} = Dimensions.get("screen")

// bookItemWidth is 1/3 of the screen width, accounting for 8px gaps on both sides
export const bookItemWidth = Math.round((width - 2 * 8) / 3)

// Aspect ratio of the book image (width / height)
export const bookItemImageAspectRatio = 120 / 150

// Height of the book image based on its aspect ratio
export const bookItemImageHeight = bookItemWidth / bookItemImageAspectRatio
