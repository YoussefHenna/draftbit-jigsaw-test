# Youssef Henna - Draftbit Component Engineer Test Submission

## Note on project structure

Locally I have cloned [react-native-jigsaw](https://github.com/draftbit/react-native-jigsaw) and working off that, but have only included the files that I have changed into the repository (using an admittedly overly complicated [.gitignore](/.gitignore)). In the case you'd want to implement this into the main repo, only the files included here need to be updated there.

The files of note regarding the task are:

- [StarRating Component](/packages/core/src/components/StarRating.tsx)
- [StarRating Mapping](/packages/core/src/mappings/StarRating.ts)
- [DeckSwiper Component Folder](/packages/core/src/components/DeckSwiper/)
- [DeckSwiper Mapping](/packages/core/src/mappings/DeckSwiper.ts)
- [DeckSwiperCard Mapping](/packages/core/src/mappings/DeckSwiperCard.ts)

## StarRating

[Snack URL]()

### Adding the Rounding Prop

Refactoring this component was rather straightforward since the requirments were minmal. An additional prop was added (`roundToInteger`), which indicates whether the rating should be rounded to the nearest integer or not.

Rounding was already implmented in that it rounds to the nearest 0.5 value. I updated this to conditionally round to integer based on the prop:

```js
const ratingRounded = roundToInteger
  ? Math.round(localRating)
  : Math.round(localRating * 2) / 2;
```

For each star in this component, there were 2 `Pressable` containers each with 50% width. One indicating 0.5 value of a given star and the next gives the 1.0 value. With the new change, we would conditionally want to remove the first `Pressable` and make the second one fill the entire width.

This was acheived by changing from percentage widths to both having equal flex in a flexbox, then just rendering the first one conditionally based on the prop. This way the second `Pressable` fills the width when its the only child.

### Other minor changes

- Refactored inline style to be in seperate styles object.
- Used theme colors for default colors, which previously were undefined and looked weird when no values were given

## DeckSwiper

[Snack URL]()

This was a direct mapping to allow [react-native-deck-swiper](https://github.com/webraptor/react-native-deck-swiper#readme) to be used in Draftbit, so the focus was to wrap the component in a Draftbit friendly component.

The main challenge here is that the library works similar to a `FlatList` in that it takes in a list of data and renders each item using that data. The use case here is dfferent since it needs to use the component's children for the cards.

To work around this, the `ReactNode` children were stored into array and queried by index for the library to render correct child at correct index.

```js
const childrenArray = React.useMemo(
  () => React.Children.toArray(children),
  [children]
);

// an array of indices based on children count
const cardsFillerData = React.useMemo(
  () => Array.from(Array(childrenArray.length).keys()),
  [childrenArray]
);
```

Additionally an array of filler data was created holding indices based on how many children there are. This was need because the library's `keyExtractor` did not provide index to be used as the key, and so I made it that the data provided is the indices themselved.

Based on the library's props, a select few were chosen for this components props which I believe cover the core functioanlity:

```js
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
}
```

Additionaly a `DeckSwiperCard` component was added to provide a container for the children of `DeckSwiper`. This is a simple wrapper with some theme-reliant styling and a way to customize each card.

This implmentation covers the core of the library but there's more that could be implmented such as:

- Add a way to populate cards using list of data (like the original library intended)
- Add a ref prop so that swiping can be done using the provided methods by the orignal library
- Add more props for further customization
