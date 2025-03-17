import {Pressable} from "react-native"
import {StatusBar} from "expo-status-bar"

import {DetailsScreen, MainScreen, SplashScreen} from "@/features"
import {SVGIcon} from "@/shared/components"

import {RootStackParamList} from "./types"

import {colors} from "@/constants"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
        headerStyle: {backgroundColor: colors.background},
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerStyle: {backgroundColor: colors.transparent},
          headerLeft: () => (
            <Pressable onPressIn={() => navigation.goBack()}>
              <SVGIcon name="arrow_left" color={colors.white} />
            </Pressable>
          )
        })}
      />
    </Stack.Navigator>
  )
}

export const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden backgroundColor="black" style="light" />
      <RootStack />
    </NavigationContainer>
  )
}
