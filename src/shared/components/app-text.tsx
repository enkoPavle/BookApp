import {FC} from "react"
import {StyleProp, Text, type TextProps, TextStyle} from "react-native"

import {ColorNames, colors, FontNames, fonts} from "@/constants"

interface Props extends TextProps {
  size?: number
  font?: FontNames
  italic?: boolean
  color?: ColorNames
  center?: boolean
}

export const AppText: FC<Props> = ({
  style,
  size,
  font,
  italic,
  color,
  center,
  ...rest
}) => {
  const textStyles: StyleProp<TextStyle> = [
    {
      fontSize: size,
      fontFamily: fonts[font ?? "notito600"],
      fontStyle: italic ? "italic" : "normal",
      textAlign: center ? "center" : "auto",
      color: colors[color ?? "white"]
    },
    style
  ]

  return <Text style={textStyles} {...rest} />
}
