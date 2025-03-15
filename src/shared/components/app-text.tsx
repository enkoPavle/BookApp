import {FC} from "react"
import {StyleProp, StyleSheet, Text, type TextProps, TextStyle} from "react-native"

import {colors, FontNames, fonts} from "@/constants"

interface Props extends TextProps {
  font: FontNames
  color?: string
  center?: boolean
}

export const AppText: FC<Props> = ({style, color, center, ...rest}) => {
  const textStyles: StyleProp<TextStyle> = [
    styles.base,
    {
      color,
      textAlign: center ? "center" : "auto"
    },
    style
  ]

  return <Text style={textStyles} {...rest} />
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontFamily: fonts.notito600,
    color: colors.black
  }
})
