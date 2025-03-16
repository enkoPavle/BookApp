import {FC, useMemo} from "react"
import {ImageBackground, StyleSheet, View} from "react-native"
import {useSharedValue} from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"
import {useSafeAreaInsets} from "react-native-safe-area-context"

import {useRemoteConfig} from "@/shared/hooks"

import {CarouselItem} from "./components/carousel-item"
import {carouselBottomOverlap, parallaxScrollingOffset} from "./utils/carousel-sizes"

import {screenSize} from "@/constants/screen"
import {RootStackParamList} from "@/navigation/types"
import {Book} from "@/schemas/book"
import {NativeStackScreenProps} from "@react-navigation/native-stack"

import ImageDetailsBackground from "#/images/details-background.png"

export const DetailsScreen: FC<NativeStackScreenProps<RootStackParamList, "Details">> = ({
  route
}) => {
  const bookId = route.params.id
  const {data} = useRemoteConfig()
  const insets = useSafeAreaInsets()
  const progress = useSharedValue<number>(0)

  const snapContainerHeight = screenSize.width + insets.top + carouselBottomOverlap

  const reorderedBooks = useMemo(() => {
    if (!data?.books.length) return []
    const index = data.books.findIndex((book) => book.id === bookId)

    return index > 0
      ? [data.books[index], ...data.books.slice(0, index), ...data.books.slice(index + 1)]
      : data.books
  }, [data?.books, bookId])

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImageDetailsBackground}
        style={{height: snapContainerHeight}}
      >
        <Carousel
          data={reorderedBooks}
          height={snapContainerHeight}
          loop={false}
          pagingEnabled={true}
          snapEnabled={true}
          width={screenSize.width}
          style={{
            width: screenSize.width
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset
          }}
          onProgressChange={progress}
          renderItem={({item}: {item: Book}) => <CarouselItem {...item} />}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
