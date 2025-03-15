import {FC, memo} from "react"
import {View} from "react-native"

interface Props {
  size?: number
}

const BASE_SIZE = 24

export const Separator: FC<Props> = memo(
  ({size}) => <View style={{height: size ?? BASE_SIZE, width: size ?? BASE_SIZE}} />,
  (prevProps, nextProps) => {
    return prevProps.size === nextProps.size
  }
)
