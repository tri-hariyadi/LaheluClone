import React, {useMemo, useState} from 'react';

import {
    type GestureResponderEvent,
    type LayoutChangeEvent,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    type ViewStyle,
} from 'react-native';
import {
    GestureHandlerRootView,
    type HandlerStateChangeEvent,
    State,
    TapGestureHandler,
    type TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {colors} from '@styles';

import type {ButtonProps} from './types';

const Button: React.FC<ButtonProps> = ({
    rippleColor,
    style,
    isOutlineButton,
    isLoading,
    background = colors.B100,
    children,
    disabled,
    isBlock,
    isRowBlock,
    // loadingText,
    onPress,
}) => {
    const MAX_OPACITY = 0.8;
    const rippleScale = useSharedValue(0);
    const rippleOpacity = useSharedValue(MAX_OPACITY);
    const tapX = useSharedValue(0);
    const tapY = useSharedValue(0);
    const [rippleStyle, setRippleStyle] = useState({width: 0, height: 0});

    const btnStyle = useMemo(() => {
        const btStyle: ViewStyle = {
            backgroundColor: !isOutlineButton ? background : 'transparent',
            alignSelf: isBlock || isRowBlock ? 'stretch' : 'baseline',
            overflow: 'hidden',
        };

        if (isOutlineButton) {
            btStyle.borderWidth = 1;
            btStyle.borderColor = background;
        }

        return btStyle;
    }, [isBlock, isOutlineButton, background, isRowBlock]);

    const rootStyle: ViewStyle = {
        alignSelf: isBlock || isRowBlock ? 'stretch' : StyleSheet.flatten(style)?.alignSelf ?? 'flex-start',
        flex: isBlock ? 1 : 0,
    };

    const animatedStyle = useAnimatedStyle(() => ({
        width: '100%',
        height: '100%',
        borderRadius: 900,
        transform: [{scale: rippleScale.value * 5}],
        opacity: rippleOpacity.value,
        backgroundColor: rippleColor ? rippleColor : isOutlineButton ? '#DEE2E6' : '#DEE2E6',
    }));

    const TapStyle = useAnimatedStyle(() => ({
        top: tapY.value,
        left: tapX.value,
    }));

    const onPressIn = () => {
        rippleScale.value = 0;
        rippleOpacity.value = MAX_OPACITY;

        rippleScale.value = withTiming(1, {duration: 600, easing: Easing.out(Easing.quad)});
        rippleOpacity.value = withTiming(0, {duration: 600, easing: Easing.out(Easing.quad)});
    };

    const onButtonPress = (event: GestureResponderEvent) => {
        if (disabled || isLoading) return;
        setTimeout(() => {
            onPress?.(event);
        }, 100);
    };

    const handleGesture = (evt: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (evt.nativeEvent.state === State.BEGAN) {
            const {x, y} = evt.nativeEvent;
            tapX.value = withTiming(x - rippleStyle.width / 2, {duration: 1});
            tapY.value = withTiming(y - rippleStyle.width / 2, {duration: 1});
        }
    };

    const handleOnLayout = (e: LayoutChangeEvent) => {
        e.persist();
        const width = e.nativeEvent?.layout?.width || 0;
        const height = e.nativeEvent?.layout?.height || 0;
        const longDimension = width < height ? height : width;
        setRippleStyle(prev => ({
            ...prev,
            width: longDimension,
            height: longDimension,
        }));
    };

    return (
        <TouchableWithoutFeedback onPressIn={onPressIn} onPress={onButtonPress}>
            <GestureHandlerRootView style={rootStyle}>
                <TapGestureHandler onHandlerStateChange={handleGesture}>
                    <View onLayout={handleOnLayout} style={[btnStyle, style]}>
                        <Animated.View
                            style={[TapStyle, rippleStyle, {position: 'absolute', backgroundColor: 'transparent'}]}>
                            <Animated.View style={animatedStyle} />
                        </Animated.View>
                        {children}
                    </View>
                </TapGestureHandler>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>
    );
};

export default Button;
