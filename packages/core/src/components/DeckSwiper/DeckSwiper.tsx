import React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import DeckSwiperComponent from "react-native-deck-swiper";
import type { Theme } from "../../styles/DefaultTheme";
import { withTheme } from "../../theming";

export interface DeckSwiperProps {
  onSwiped?: (cardIndex: number) => void;
  onSwipedAll?: () => void;
  startCardIndex?: number;
  infiniteSwiping?: boolean;
  verticalEnabled?: boolean;
  horizontalEnabled?: boolean;
  visibleCardCount?: number;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  theme: Theme;
}

const DeckSwiper = ({
  onSwiped,
  onSwipedAll,
  startCardIndex = 0,
  infiniteSwiping = false,
  verticalEnabled = true,
  horizontalEnabled = true,
  visibleCardCount = 1,
  style,
  cardStyle,
  children,
  theme,
}: DeckSwiperProps) => {
  const childrenArray = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // an array of indices based on children count
  const cardsFillerData = React.useMemo(
    () => Array.from(Array(childrenArray.length).keys()),
    [childrenArray]
  );

  return (
    <DeckSwiperComponent
      cards={cardsFillerData}
      renderCard={(_, i) => <>{childrenArray[i]}</>}
      keyExtractor={(card) => card.toString()}
      containerStyle={
        StyleSheet.flatten([styles.cardsContainer, style]) as object | undefined
      }
      cardStyle={
        StyleSheet.flatten([
          styles.card,
          {
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.global,
            borderColor: theme.colors.divider,
          },
          cardStyle,
        ]) as object | undefined
      }
      onSwiped={onSwiped}
      onSwipedAll={onSwipedAll}
      cardIndex={startCardIndex}
      infinite={infiniteSwiping}
      verticalSwipe={verticalEnabled}
      horizontalSwipe={horizontalEnabled}
      showSecondCard={visibleCardCount > 1}
      stackSize={visibleCardCount}
    />
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    width: "100%",
  },
  card: {
    padding: 20,
    left: 0,
    right: 0,
    width: "auto",
    height: "auto",
    borderWidth: 2,
  },
});

export default withTheme(DeckSwiper);
