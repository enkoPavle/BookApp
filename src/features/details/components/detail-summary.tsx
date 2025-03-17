import {FC, memo} from "react"
import {StyleSheet, View} from "react-native"

import {AppText} from "@/shared/components"

import {colors, fonts} from "@/constants"
import {Book} from "@/schemas/book"

interface Props {
  summary?: Book["summary"]
}

export const DetailSumary: FC<Props> = memo(
  ({summary}) => (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title}>Summary</AppText>
        <AppText style={styles.value}>{summary}</AppText>
      </View>
    </View>
  ),
  (prev, next) => prev.summary === next.summary
)

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    paddingHorizontal: 16
  },
  content: {
    position: "relative",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: colors.lightSilver
  },
  title: {
    fontFamily: fonts.notito700,
    fontSize: 20,
    color: colors.black
  },
  value: {
    fontSize: 14,
    color: colors.onyx
  }
})
