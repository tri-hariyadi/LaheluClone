import {useState} from 'react';

import {LayoutChangeEvent} from 'react-native';
import {useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

const HEIGHT_VISIBILITY_THRESHOLD = 50;

const useAnimatedHeader = () => {
    const scrollY = useSharedValue(0);
    const [headerHeight, setHeight] = useState(100);
    const top = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            const y = event.contentOffset.y;
            const scrollingDown = y > scrollY.value;
            const scrollingUp = y < scrollY.value;

            if (scrollingUp) {
                top.value = withTiming(0, {duration: 300});
            } else if (scrollingDown && y > HEIGHT_VISIBILITY_THRESHOLD) {
                top.value = withTiming(-headerHeight, {duration: 300});
            }

            scrollY.value = y;
        },
    });

    const setHeaderHeight = (event: LayoutChangeEvent) => {
        setHeight(event.nativeEvent.layout.height);
    };

    const animatedHeaderStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: top.value}],
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
        };
    });

    return {
        /**
         * The value of the header height that can be used for spacing needs(padding or margin) in the component
         *
         * default value = 50px
         */
        headerHeight,
        /**
         * Set initial height of header, you can invoke this setter in the
         * onLayout(Invoked on mount and layout changes with) in your header component
         */
        setHeaderHeight,
        /**
         * Lets you run callbacks on ScrollView events.
         * Supports `onScroll`, `onBeginDrag`, `onEndDrag`, `onMomentumBegin`, and `onMomentumEnd` events.
         */
        scrollHandler,
        /**
         * Styling for header component, enabling header components that use this can have up and down translate animations.
         */
        animatedHeaderStyle,
    };
};

export default useAnimatedHeader;
