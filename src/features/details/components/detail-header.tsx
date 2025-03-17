import React, {FC, memo} from "react"
import {StyleSheet, View} from "react-native"

import {AppText} from "@/shared/components"

import {colors, fonts} from "@/constants"
import {Book} from "@/schemas/book"

interface Props {
  book?: Book
  BlurComponent: React.ComponentType
}

export const DetailHeader: FC<Props> = memo(
  ({book, BlurComponent}) => (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBlock}>
          <AppText style={styles.scoreValue}>{book?.views ?? 0}</AppText>
          <AppText style={styles.scoreTitle}>Readers</AppText>
          <BlurComponent />
        </View>
        <View style={styles.scoreBlock}>
          <AppText style={styles.scoreValue}>{book?.likes ?? 0}</AppText>
          <AppText style={styles.scoreTitle}>Likes</AppText>
          <BlurComponent />
        </View>
        <View style={styles.scoreBlock}>
          <AppText style={styles.scoreValue}>{book?.quotes ?? 0}</AppText>
          <AppText style={styles.scoreTitle}>Quotes</AppText>
          <BlurComponent />
        </View>
        <View style={styles.scoreBlock}>
          <AppText style={styles.scoreValue}>{book?.genre ?? 0}</AppText>
          <AppText style={styles.scoreTitle}>Genre</AppText>
          <BlurComponent />
        </View>
      </View>
    </View>
  ),
  (prev, next) => prev.book?.id === next.book?.id
)

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 16
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderColor: colors.lightSilver,
    borderBottomWidth: 1
  },
  scoreBlock: {
    alignItems: "center"
  },
  scoreValue: {
    fontFamily: fonts.notito700,
    fontSize: 18,
    color: colors.black,
    marginBottom: -4
  },
  scoreTitle: {
    fontSize: 12,
    color: colors.lavenderGray
  }
})
