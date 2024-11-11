import React, {useCallback, useMemo} from 'react';

import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
// eslint-disable-next-line no-duplicate-imports
import type {ViewStyle} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {img_profile} from '@assets/images';
import {colors, dimens, scale} from '@styles';
import {useUpdateEffect} from '@utils/hooks';

import styles from './styles';
import type {ProgressiveImageProps} from './type';

/** Component handles image caching like browsers for the performance optimization */
const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
    onLoadStart,
    onLoadEnd,
    onError,
    onLoad,
    style,
    defaultErrorImageSource,
    activityIndicatorColor = colors.B100,
    activityIndicatorSize = dimens.ClickSizeS,
    containerStyle,
    ...props
}) => {
    const errorOpacity = useSharedValue(0);
    const loadingOpacity = useSharedValue(0);

    const handleOnLoadStart = useCallback(() => {
        loadingOpacity.value = 1;
        errorOpacity.value = 0;
        onLoadStart?.();
    }, []);

    const handleOnLoadEnd = useCallback(() => {
        loadingOpacity.value = 0;
        onLoadEnd?.();
    }, []);

    const handleOnError = useCallback(() => {
        errorOpacity.value = 1;
        onError?.();
    }, []);

    const errorStyle = useAnimatedStyle(() => ({
        opacity: withTiming(errorOpacity.value, {duration: 180}),
    }));

    const loadingStyle = useAnimatedStyle(() => ({
        opacity: withTiming(loadingOpacity.value, {duration: 180}),
    }));

    useUpdateEffect(() => {
        if (!(props.source as Source)?.uri) {
            errorOpacity.value = 1;
        }
    }, [props.source]);

    const contentContainerStyle = useMemo<ViewStyle>(() => {
        const imgStyle = StyleSheet.flatten(style);
        return {
            borderRadius: imgStyle?.borderRadius,
            borderTopLeftRadius: imgStyle?.borderTopLeftRadius,
            borderTopRightRadius: imgStyle?.borderTopRightRadius,
            borderBottomLeftRadius: imgStyle?.borderBottomLeftRadius,
            borderBottomRightRadius: imgStyle?.borderBottomRightRadius,
            width: imgStyle?.width,
            height: imgStyle?.height,
        };
    }, [style]);

    return (
        <View>
            <View style={[styles.container, containerStyle, contentContainerStyle]}>
                <FastImage
                    {...props}
                    style={style}
                    onLoadStart={handleOnLoadStart}
                    onLoadEnd={handleOnLoadEnd}
                    onLoad={onLoad}
                    onError={handleOnError}
                />
                <Animated.View style={[styles.overlay, errorStyle]}>
                    <Image source={defaultErrorImageSource ?? img_profile} style={styles.skeleton} />
                </Animated.View>
                <Animated.View style={[styles.overlay, loadingStyle]}>
                    <ActivityIndicator
                        color={activityIndicatorColor}
                        size={scale(activityIndicatorSize)}
                        style={styles.activityIndicator}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default ProgressiveImage;
