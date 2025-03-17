import React, {FC, ReactNode, useEffect, useMemo, useState} from "react"
import {Animated, Pressable, PressableProps, StyleSheet, TextProps} from "react-native"

import {AppText} from "./app-text"

import {colors} from "@/constants"

interface Props extends PressableProps {
  textStyle?: TextProps["style"]
}

export const AppButton: FC<Props> = ({children, textStyle, disabled, ...rest}) => {
  const [pressed, setPressed] = useState(false)

  const animatedValue = useMemo(() => new Animated.Value(0), [])

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: disabled ? 2 : pressed ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }, [pressed, disabled])

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: disabled ? 2 : pressed ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }, [])

  const interpolateBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors.raspberryPink, colors.raspberryPink + "CC", colors.gray]
  })

  const handlePressIn = () => {
    setPressed(true)
  }

  const handlePressOut = () => {
    setPressed(false)
  }

  return (
    <Animated.View
      style={[
        {
          backgroundColor: interpolateBackgroundColor
        },
        styles.container
      ]}
    >
      <Pressable
        {...rest}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <AppText style={[styles.text, textStyle]}>{children as ReactNode}</AppText>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
    borderRadius: 24,
    overflow: "hidden"
  },
  pressable: {
    alignItems: "center",
    paddingHorizontal: 20
  },
  text: {
    color: colors.white,
    fontSize: 16
  }
})
