import {useCallback, useEffect, useMemo} from "react"
import {StyleSheet, View} from "react-native"
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context"
import {LinearGradient} from "expo-linear-gradient"
import {setStatusBarHidden} from "expo-status-bar"

import {AppText, Separator} from "@/shared/components"
import {useRemoteConfig} from "@/shared/hooks"

import {Banner} from "./components/banner"
import {GenreItem} from "./components/genre-item"
import {GenreListItem} from "./types"

import {colors} from "@/constants"
import {FlashList} from "@shopify/flash-list"

export const MainScreen = () => {
  const {data} = useRemoteConfig()
  const insets = useSafeAreaInsets()

  const groupedBooks = useMemo(() => {
    if (!data?.books) return []

    const map = new Map<string, GenreListItem>()

    data.books.forEach((book) => {
      if (!map.has(book.genre)) {
        map.set(book.genre, {genre: book.genre, books: []})
      }
      map.get(book.genre)!.books.push(book)
    })

    return Array.from(map.values())
  }, [data])

  const renderItem = useCallback(
    ({item}: {item: GenreListItem}) => <GenreItem {...item} />,
    []
  )

  useEffect(() => {
    setStatusBarHidden(false)
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <AppText font="notito700" size={20} color={"royalRed"}>
          Library
        </AppText>
        <LinearGradient
          colors={[colors.background, colors.background, colors.background + "00"]}
          style={styles.gradient}
        />
      </View>
      <FlashList
        data={groupedBooks}
        contentContainerStyle={StyleSheet.flatten([
          styles.contentContainerStyle,
          {paddingBottom: insets.bottom + 45}
        ])}
        estimatedItemSize={230}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Banner data={data} />}
        ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    position: "relative",
    paddingTop: 18,
    paddingHorizontal: 16
  },
  gradient: {
    position: "absolute",
    bottom: -16,
    left: 0,
    right: 0,
    height: 16,
    zIndex: 1
  },
  contentContainerStyle: {
    paddingTop: 16
  },
  ListHeaderComponentStyle: {
    marginBottom: 40
  }
})
