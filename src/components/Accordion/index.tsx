import React from 'react';

import {View} from 'react-native';
import Animated, {
    measure,
    runOnUI,
    SharedValue,
    useAnimatedRef,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import Button from '../Button';
import Icon from '../Icon';
import Row from '../Row';
import Show from '../Show';
import Text from '../Text';
import styles from './styles';
import {AccordionProps} from './types';

const Chevron = (props: {progress: Readonly<SharedValue<0 | 1>>}) => {
    const iconStyle = useAnimatedStyle(() => ({
        transform: [{rotate: `${props.progress.value * -180}deg`}],
    }));

    return (
        <Animated.View style={iconStyle}>
            <Icon name="ic_triangle" size={20} style={{transform: [{rotate: '180deg'}]}} />
        </Animated.View>
    );
};

const Accordion: React.FC<AccordionProps> = ({children, header, headerTitle, headerTitleStyle, style}) => {
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const open = useSharedValue(false);
    const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    const onAccordionPress = () => {
        if (heightValue.value === 0) {
            runOnUI(() => {
                'worklet';
                heightValue.value = withTiming(measure(listRef)!.height);
            })();
        } else {
            heightValue.value = withTiming(0);
        }
        open.value = !open.value;
    };

    return (
        <View style={[styles.container, style]}>
            <Button isBlock background="transparent" onPress={onAccordionPress}>
                <Show>
                    <Show.When isTrue={React.isValidElement(header?.(progress))}>{header?.(progress)}</Show.When>
                    <Show.Else>
                        <Row flex={1} justifyBetween>
                            <Text {...headerTitleStyle}>{headerTitle}</Text>
                            <Chevron progress={progress} />
                        </Row>
                    </Show.Else>
                </Show>
            </Button>
            <Animated.View style={heightAnimationStyle}>
                <Animated.View style={styles.contentContainer} ref={listRef}>
                    {children}
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default Accordion;
