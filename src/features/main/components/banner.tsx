import React, {FC, useCallback, useMemo} from "react"
import {Dimensions, Pressable, StyleSheet, View} from "react-native"
import FastImage from "react-native-fast-image"
import {useSharedValue} from "react-native-reanimated"
import Carousel, {ICarouselInstance, Pagination} from "react-native-reanimated-carousel"

import {useAppNavigation} from "@/shared/hooks"

import {colors} from "@/constants"
import {Book} from "@/schemas/book"
import {JsonData} from "@/schemas/json-data"

interface BannerProps {
  data: JsonData | undefined
}

const {width} = Dimensions.get("window")
const aspectRatio = 343 / 160
const padding = 16

export const Banner: FC<BannerProps> = ({data}) => {
  const ref = React.useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)
  const {navigate} = useAppNavigation()

  const movies = useMemo(() => {
    const result: Book[] = []

    data?.top_banner_slides.forEach((item) => {
      const book = data.books.find((book) => book.id === item.book_id)

      if (book) result.push(book)
    })

    return result
  }, [data])

  const renderItem = useCallback(
    ({index}: {index: number}) => {
      const book = movies[index]

      return (
        <Pressable
          style={styles.imageContainer}
          onPress={() => navigate("Details", {id: book.id})}
        >
          <FastImage
            source={{uri: book.cover_url}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Pressable>
      )
    },
    [movies, navigate]
  )

  return (
    <View style={styles.constainer}>
      <Carousel
        ref={ref}
        width={width}
        height={(width - padding * 2) / aspectRatio}
        data={movies}
        autoPlay
        autoPlayInterval={3000}
        onProgressChange={progress}
        renderItem={renderItem}
      />
      <Pagination.Basic
        progress={progress}
        data={movies}
        containerStyle={styles.pagination}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    position: "relative"
  },
  imageContainer: {
    paddingHorizontal: padding
  },
  image: {
    aspectRatio,
    borderRadius: 16
  },
  pagination: {
    position: "absolute",
    bottom: 8,
    gap: 10
  },
  dotStyle: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: colors.lavenderGray
  },
  activeDotStyle: {
    backgroundColor: colors.royalRed
  }
})
