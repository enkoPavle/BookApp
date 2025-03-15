import {FC} from "react"
import {StyleSheet, View} from "react-native"
import FastImage from "react-native-fast-image"

import {AppText} from "@/shared/components"

import {bookItemImageHeight, bookItemWidth} from "../util/book-item-size"

import {colors} from "@/constants"
import {Book} from "@/schemas/book"

export const BookItem: FC<Book> = ({cover_url, name}) => {
  return (
    <View style={styles.container}>
      <FastImage source={{uri: cover_url}} style={styles.image} />
      <AppText
        style={styles.text}
        font="notito700"
        color="white70"
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
