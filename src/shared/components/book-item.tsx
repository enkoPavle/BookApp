import {FC} from "react"
import {StyleSheet, View} from "react-native"
import FastImage from "react-native-fast-image"

import {AppText} from "@/shared/components/app-text"

import {colors} from "@/constants"
import {Book} from "@/schemas/book"
import {bookItemImageHeight, bookItemWidth} from "@/util/book-item-size"

interface Props extends Book {
  variant?: "light" | "dark"
}

export const BookItem: FC<Props> = ({variant, cover_url, name}) => {
  return (
    <View style={styles.container}>
      <FastImage source={{uri: cover_url}} style={styles.image} />
      <AppText
        style={styles.text}
        font="notito700"
        color={variant === "dark" ? "white70" : "onyx"}
        size={16}
        numberOfLines={2}
      >
        {name}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: bookItemWidth,
    gap: 4
  },
  image: {
    width: bookItemWidth,
    height: bookItemImageHeight,
    backgroundColor: colors.gray,
    borderRadius: 10
  },
  text: {
    flexShrink: 1
  }
})
