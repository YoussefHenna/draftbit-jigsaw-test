import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface DeckSwiperCardProps {
  cardContentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const DeckSwiperCard = ({
  cardContentStyle,
  children,
}: DeckSwiperCardProps) => (
  <View style={[styles.wrapper, cardContentStyle]}>{children}</View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeckSwiperCard;
