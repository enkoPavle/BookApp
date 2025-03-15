import React, {useEffect} from "react"
import {StyleSheet, View} from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated"

import {colors} from "@/constants"

const CONTAINER_WIDTH = 274
const ITEM_WIDTH = 56
const DURATION = 1200

export const InfiniteLoader = () => {
  const translateX = useSharedValue(-ITEM_WIDTH)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(CONTAINER_WIDTH, {duration: DURATION, easing: Easing.linear}),
      -1,
      false
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}]
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: 6,
    overflow: "hidden",
    backgroundColor: colors.white20,
    borderRadius: 6
  },
  loader: {
    width: ITEM_WIDTH,
    height: "100%",
    backgroundColor: colors.white,
    borderRadius: 6
  }
})
