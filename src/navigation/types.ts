export type RootStackParamList = {
  Main: undefined
  Details: {id: number}
  Splash: undefined
}

declare module "@react-navigation/native" {
  export interface RootParamList extends RootStackParamList {}
}
