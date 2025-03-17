import {FC, useCallback, useMemo, useRef, useState} from "react"
import {ImageBackground, StyleSheet, View} from "react-native"
import Animated, {Easing, interpolate, useSharedValue} from "react-native-reanimated"
import Carousel, {ICarouselInstance} from "react-native-reanimated-carousel"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {BlurView} from "expo-blur"

import {AppButton, BookList} from "@/shared/components"
import {useRemoteConfig} from "@/shared/hooks"

import {CarouselItem} from "./components/carousel-item"
import {DetailHeader} from "./components/detail-header"
import {DetailSumary} from "./components/detail-summary"
import {carouselBottomOverlap, parallaxScrollingOffset} from "./utils/carousel-sizes"

import {screenSize} from "@/constants/screen"
import {RootStackParamList} from "@/navigation/types"
import {Book} from "@/schemas/book"
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet"
import {NativeStackScreenProps} from "@react-navigation/native-stack"

import ImageDetailsBackground from "#/images/details-background.png"

Animated.addWhitelistedNativeProps({intensity: true})
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const DetailsScreen: FC<NativeStackScreenProps<RootStackParamList, "Details">> = ({
  route: {params}
}) => {
  const ref = useRef<ICarouselInstance>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [carouselEnabled, setCarouselEnabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const animatedIntensity = useSharedValue<number | undefined>(0)
  const insets = useSafeAreaInsets()
  const {data} = useRemoteConfig()

  const snapContainerHeight = screenSize.width + insets.top + carouselBottomOverlap

  const reorderedBooks = useMemo(() => {
    const books = data?.books ?? []

    if (books.length === 0) return []

    const index = books.findIndex((book) => book.id === params.id)

    // no need to reorder
    if (index <= 0) return books

    return [books[index], ...books.slice(0, index), ...books.slice(index + 1)]
  }, [data?.books, params.id])

  const recommendedBooks = useMemo(() => {
    const books = data?.books ?? []
    const section = data?.you_will_like_section ?? []

    return section
      .map((bookId) => books.find((book) => book.id === bookId))
      .filter((book): book is Book => book !== undefined)
  }, [data?.books, data?.you_will_like_section])

  const selectedBook: Book | undefined = useMemo(() => {
    if (!reorderedBooks.length) return undefined
    return reorderedBooks[selectedIndex]
  }, [reorderedBooks, selectedIndex])

  const onProgressChange = useCallback((offsetProgress: number) => {
    const currentIndex = ref.current?.getCurrentIndex()

    if (currentIndex !== undefined) setSelectedIndex(currentIndex)

    const value = Math.abs(offsetProgress / screenSize.width) % 1
    const easedValue = Easing.inOut(Easing.inOut(Easing.cubic))(value)
    const intensity = interpolate(easedValue, [0, 0.5, 1], [0, 15, 0])

    // prevent flickering on intensity between 0 and 1
    animatedIntensity.value = intensity >= 1 ? intensity : 0
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImageDetailsBackground}
        style={{height: snapContainerHeight}}
      >
        <Carousel
          data={reorderedBooks}
          enabled={carouselEnabled}
          height={snapContainerHeight}
          loop={false}
          width={screenSize.width}
          style={{
            width: screenSize.width
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset
          }}
          ref={ref}
          onProgressChange={onProgressChange}
          renderItem={({item}: {item: Book}) => <CarouselItem {...item} />}
        />
      </ImageBackground>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[screenSize.height - snapContainerHeight, "80%"]}
        index={0}
        enableDynamicSizing={false}
        animateOnMount={false}
        enableOverDrag={false}
        onChange={(index) => setCarouselEnabled(!index)}
        handleComponent={() => (
          <DetailHeader
            book={selectedBook}
            BlurComponent={() => (
              <AnimatedBlurView
                intensity={animatedIntensity}
                tint={"extraLight"}
                style={styles.animatedBlurView}
              />
            )}
          />
        )}
      >
        <BottomSheetScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.contentContainer,
            {paddingBottom: insets.bottom + 52}
          ]}
        >
          <DetailSumary
            summary={selectedBook?.summary}
            BlurComponent={() => (
              <AnimatedBlurView
                intensity={animatedIntensity}
                tint={"extraLight"}
                style={styles.animatedBlurView}
              />
            )}
          />
          <BookList variant="light" title="You will also like" books={recommendedBooks} />
          <View style={styles.buttonContainer}>
            <AppButton>Read Now</AppButton>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    gap: 16,
    paddingTop: 16
  },
  buttonContainer: {
    paddingTop: 8,
    paddingHorizontal: 48
  },
  animatedBlurView: {
    position: "absolute",
    top: -3,
    left: -5,
    right: -5,
    bottom: -3
  }
})
