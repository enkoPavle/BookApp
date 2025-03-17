import {FC, memo} from "react"
import {StyleSheet, View} from "react-native"
import FastImage from "react-native-fast-image"

import {AppText} from "@/shared/components"

import {imageAspectRatio, imageWidth} from "../utils/carousel-params"

import {colors, fonts} from "@/constants"
import {Book} from "@/schemas/book"

export const CarouselItem: FC<Book> = memo(
  ({name, author, cover_url}) => {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <FastImage source={{uri: cover_url}} style={styles.image} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.name} numberOfLines={2}>
              {name}
            </AppText>
            <AppText style={styles.author} numberOfLines={1}>
              {author}
            </AppText>
          </View>
        </View>
      </View>
    )
  },
  (prev, next) => {
    return prev.id === next.id
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  image: {
    width: imageWidth,
    aspectRatio: imageAspectRatio,
    backgroundColor: colors.lavenderGray,
    borderRadius: 16
  },
  detailsContainer: {
    gap: 5,
    alignItems: "center"
  },
  name: {
    maxWidth: imageWidth,
    fontFamily: fonts.notito700,
    fontSize: 20
  },
  author: {
    maxWidth: imageWidth,
    fontFamily: fonts.notito700,
    fontSize: 14,
    color: colors.white80
  }
})
