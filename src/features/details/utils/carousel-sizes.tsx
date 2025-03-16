import {screenSize} from "@/constants/screen"

const widthRatio = screenSize.width / 375

export const imageWidth = Math.round(200 * widthRatio)
export const imageAspectRatio = 200 / 250
export const carouselBottomOverlap = 22
export const parallaxScrollingOffset = Math.round(screenSize.width / 1.75)
