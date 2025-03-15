import {useEffect} from "react"
import {StyleSheet, View} from "react-native"
import {setStatusBarHidden} from "expo-status-bar"

import {colors} from "@/constants"

export const MainScreen = () => {
  useEffect(() => {
    setStatusBarHidden(false)
  }, [])

  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
})
