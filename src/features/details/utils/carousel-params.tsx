import {Platform} from "react-native"

import {screenSize} from "@/constants/screen"

const widthRatio = screenSize.width / 375

export const imageWidth = Math.round(200 * widthRatio)
export const imageAspectRatio = 200 / 250
export const carouselBottomOverlap = 22
export const parallaxScrollingOffset = Math.round(screenSize.width / 1.75)

export const maxBlurIntensity = Platform.OS === "ios" ? 15 : 100
export const blurTint = Platform.OS === "ios" ? "extraLight" : "default"
