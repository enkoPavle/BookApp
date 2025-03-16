import {FC, useCallback} from "react"
import {Pressable, StyleSheet, View} from "react-native"

import {AppText, Separator} from "@/shared/components"
import {useAppNavigation} from "@/shared/hooks"

import {BookItem} from "./book-item"
import {GenreListItem} from "../types"
import {bookItemWidth} from "../util/book-item-size"

import {Book} from "@/schemas/book"
import {FlashList} from "@shopify/flash-list"

export const GenreItem: FC<GenreListItem> = ({genre, books}) => {
  const navigation = useAppNavigation()

  const renderItem = useCallback(
    ({item}: {item: Book}) => (
      <Pressable onPress={() => navigation.push("Details", {id: item.id})}>
        <BookItem {...item} />
      </Pressable>
    ),
    [navigation]
  )

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
        renderItem={renderItem}
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
