import {FC, useEffect} from "react"
import {ImageBackground, StyleSheet} from "react-native"
import {setStatusBarHidden} from "expo-status-bar"

import {RootStackParamList} from "@/navigation/types"
import {NativeStackScreenProps} from "@react-navigation/native-stack"

import ImageSplashBack from "#/back.png"
import ImageSplashHearts from "#/hearts.png"

type Props = NativeStackScreenProps<RootStackParamList, "Splash">

export const SplashScreen: FC<Props> = ({navigation}) => {
  useEffect(() => {
    setStatusBarHidden(true)

    setTimeout(() => {
      navigation.replace("Main")
    }, 2000)
  }, [])

  return (
    <ImageBackground style={styles.container} source={ImageSplashBack}>
      <ImageBackground
        source={ImageSplashHearts}
        style={styles.content}
      ></ImageBackground>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
