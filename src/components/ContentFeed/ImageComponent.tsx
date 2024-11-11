import React, {useState} from 'react';

import {Dimensions, type LayoutRectangle} from 'react-native';
import FastImage, {type OnLoadEvent} from 'react-native-fast-image';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import ProgressiveImage from '../ProgressiveImage';
import styles from './styles';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ImageComponent: React.FC<{imageUri: string}> = ({imageUri}) => {
    const [imageDimensions, setImageDimensions] = useState<Omit<LayoutRectangle, 'x' | 'y'>>({
        width: screenWidth,
        height: screenHeight * 0.5,
    });
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate(event => {
            scale.value = withSpring(event.scale);
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        })
        .onEnd(() => {
            scale.value = withSpring(1); // Reset kembali ukuran ketika cubitan selesai
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: focalX.value},
            {translateY: focalY.value},
            {translateX: -imageDimensions.width / 2},
            {translateY: -imageDimensions.height / 2},
            {scale: scale.value},
            {translateX: -focalX.value},
            {translateY: -focalY.value},
            {translateX: imageDimensions.width / 2},
            {translateY: imageDimensions.height / 2},
        ],
    }));

    const onLoadImage = (evt: OnLoadEvent) => {
        const {width, height} = evt.nativeEvent;
        if (width && height) {
            const aspectRatio = width / height;

            if (aspectRatio < 1) {
                // Video in portrait mode Set higher
                setImageDimensions({
                    width: screenWidth,
                    height: screenHeight * 0.6,
                });
            } else {
                // Video in landscape mode
                setImageDimensions({
                    width: screenWidth,
                    height: screenWidth / aspectRatio,
                });
            }
        }
    };

    return (
        <GestureHandlerRootView style={{zIndex: 9}}>
            <GestureDetector gesture={pinchGesture}>
                <Animated.View style={animatedStyle}>
                    <ProgressiveImage
                        source={{uri: imageUri}}
                        style={imageDimensions ?? styles.content}
                        resizeMode={FastImage.resizeMode.contain}
                        onLoad={onLoadImage}
                    />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

export default ImageComponent;
