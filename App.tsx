import {Navigation} from "@/navigation"
import * as SplashScreen from "expo-splash-screen"
import "react-native-reanimated"

SplashScreen.setOptions({
  duration: 500,
  fade: true
})

export default function App() {
  return <Navigation />
}
