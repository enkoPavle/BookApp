import {FC} from "react"
import {Dimensions, StyleSheet, View} from "react-native"

import {AppText, Separator} from "@/shared/components"

import {BookItem} from "./book-item"
import {GenreListItem} from "../types"
import {bookItemWidth} from "../util/book-item-size"

import {FlashList} from "@shopify/flash-list"

export const GenreItem: FC<GenreListItem> = ({genre, books}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.paddingHorizontal} font="notito700" color="white" size={20}>
        {genre}
      </AppText>
      <FlashList
        data={books}
        horizontal
        contentContainerStyle={styles.paddingHorizontal}
        estimatedItemSize={bookItemWidth}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <BookItem {...item} />}
        ItemSeparatorComponent={() => <Separator size={8} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 14
  },
  paddingHorizontal: {
    paddingHorizontal: 16
  }
})
