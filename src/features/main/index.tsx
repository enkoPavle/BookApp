import {useEffect} from "react"
import {StyleSheet, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {setStatusBarHidden} from "expo-status-bar"

import {AppText} from "@/shared/components"

import {colors} from "@/constants"

export const MainScreen = () => {
  useEffect(() => {
    setStatusBarHidden(false)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppText font="notito700" size={20} color={"royalRed"}>
          Library
        </AppText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16
  },
  header: {
    paddingTop: 18,
    paddingBottom: 8
  }
})
