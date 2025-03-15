import {FC, useEffect} from "react"
import {ImageBackground, StyleSheet, View} from "react-native"
import {getLoadedFonts} from "expo-font"
import {setStatusBarHidden} from "expo-status-bar"

import {AppText} from "@/shared/components"

import {RootStackParamList} from "@/navigation/types"
import {NativeStackScreenProps} from "@react-navigation/native-stack"

import ImageSplashBack from "#/back.png"
import ImageSplashHearts from "#/hearts.png"

type Props = NativeStackScreenProps<RootStackParamList, "Splash">

export const SplashScreen: FC<Props> = ({navigation}) => {
  useEffect(() => {
    setStatusBarHidden(true)
    console.log(getLoadedFonts())

    setTimeout(() => {
      navigation.replace("Main")
    }, 2000)
  }, [])

  return (
    <ImageBackground style={styles.container} source={ImageSplashBack}>
      <ImageBackground source={ImageSplashHearts} style={styles.content}>
        <View style={styles.textContainer}>
          <AppText font="georgia" center size={52} color="raspberryPink" italic>
            Book App
          </AppText>
          <AppText font="notito600" center size={24} color="white80">
            Welcome to Book App
          </AppText>
        </View>
      </ImageBackground>
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
    alignItems: "center",
    gap: 24
  },
  textContainer: {
    gap: 12
  }
})
