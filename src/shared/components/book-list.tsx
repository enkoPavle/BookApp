import {FC, useCallback} from "react"
import {Pressable, StyleSheet, View} from "react-native"

import {AppText, BookItem, Separator} from "@/shared/components"
import {useAppNavigation} from "@/shared/hooks"

import {Book} from "@/schemas/book"
import {bookItemWidth} from "@/util/book-item-size"
import {BottomSheetFlashList} from "@gorhom/bottom-sheet"
import {FlashList} from "@shopify/flash-list"

interface Props {
  variant?: "light" | "dark"
  useBottomSheetFlashList?: boolean
  title: string
  books: Book[]
}

export const BookList: FC<Props> = ({
  variant = "dark",
  useBottomSheetFlashList,
  title,
  books
}) => {
  const navigation = useAppNavigation()

  const ListComponent = useBottomSheetFlashList ? BottomSheetFlashList : FlashList

  const renderItem = useCallback(
    ({item}: {item: Book}) => (
      <Pressable onPress={() => navigation.push("Details", {id: item.id})}>
        <BookItem variant={variant} {...item} />
      </Pressable>
    ),
    [navigation, variant]
  )

  if (!books.length) return null

  return (
    <View style={styles.container}>
      <AppText
        style={styles.paddingHorizontal}
        font="notito700"
        color={variant === "dark" ? "white" : "black"}
        size={20}
      >
        {title}
      </AppText>
      <ListComponent
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
