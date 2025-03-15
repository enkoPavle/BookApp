import {FC, useEffect} from "react"

import {RootStackParamList} from "@/navigation/types"
import {NativeStackScreenProps} from "@react-navigation/native-stack"

type Props = NativeStackScreenProps<RootStackParamList, "Splash">

export const SplashScreen: FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main")
    }, 2000)
  }, [])

  return null
}
