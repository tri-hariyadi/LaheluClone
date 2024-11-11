import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';

import {ActivityIndicator, Dimensions, type LayoutRectangle, Pressable, TouchableOpacity, View} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {runOnUI, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import Video, {type OnLoadData, type OnProgressData, type VideoRef} from 'react-native-video';

import {colors, dimens, moderateScale} from '@styles';
import {useUpdateEffect} from '@utils/hooks';

import Icon from '../Icon';
import Row from '../Row';
import styles from './styles';
import type {VideoPlayerProps, VideoPlayerRefObject} from './types';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const VideoPlayer = forwardRef<VideoPlayerRefObject, VideoPlayerProps>(
    ({isPlaying, videoUri, index, playingVideo, isMuted, handleMuteToggle}, ref) => {
        const videoRefs = useRef<VideoRef>(null);
        const [videoDimensions, setVideoDimensions] = useState<Omit<LayoutRectangle, 'x' | 'y'>>({
            width: screenWidth,
            height: screenHeight * 0.5,
        });
        const onPlay = useRef(true);

        const loading = useSharedValue(true);
        const showBtnPause = useSharedValue(0);

        const progress = useSharedValue(30);
        const min = useSharedValue(0);
        const max = useSharedValue(100);

        const scale = useSharedValue(1);
        const focalX = useSharedValue(0);
        const focalY = useSharedValue(0);

        useUpdateEffect(() => {
            onPlay.current = isPlaying;
            runOnUI(() => {
                'worklet';
                showBtnPause.value = withTiming(0, {duration: 300});
            })();
        }, [isPlaying]);

        const handlePlayPause = () => {
            if (onPlay.current) {
                videoRefs.current?.pause();
                runOnUI(() => {
                    'worklet';
                    showBtnPause.value = withTiming(1, {duration: 300});
                })();
            } else {
                videoRefs.current?.resume();
                runOnUI(() => {
                    'worklet';
                    showBtnPause.value = withTiming(0, {duration: 300});
                })();
            }
            onPlay.current = !onPlay.current;
        };

        const onProgress = (evt: OnProgressData) => {
            runOnUI(() => {
                'worklet';
                progress.set(evt.currentTime);
            })();
            if (evt.playableDuration !== 0 && evt.playableDuration < evt.currentTime) {
                runOnUI(() => {
                    'worklet';
                    loading.value = true;
                })();
            } else {
                runOnUI(() => {
                    'worklet';
                    loading.value = false;
                })();
            }
        };

        const onBuffer = ({isBuffering}: {isBuffering: boolean}) => {
            runOnUI(() => {
                'worklet';
                loading.value = isBuffering;
            })();
        };

        const onLoadStart = () => {
            runOnUI(() => {
                'worklet';
                loading.value = true;
            })();
        };

        const onLoad = (evt: OnLoadData) => {
            const {width, height} = evt.naturalSize;
            if (width && height) {
                const aspectRatio = width / height;

                if (aspectRatio < 1) {
                    // Video in portrait mode Set higher
                    setVideoDimensions({
                        width: screenWidth,
                        height: screenHeight * 0.6,
                    });
                } else {
                    // Video in landscape mode
                    setVideoDimensions({
                        width: screenWidth,
                        height: screenWidth / aspectRatio,
                    });
                }
            }
            runOnUI(() => {
                'worklet';
                loading.value = false;
            })();
            runOnUI(() => {
                'worklet';
                max.set(evt.duration);
            })();
        };

        const onSlide = (value: number) => {
            videoRefs.current?.seek(value);
            runOnUI(() => {
                'worklet';
                progress.set(value);
            })();
        };

        useImperativeHandle(ref, () => ({
            pause() {
                videoRefs.current?.pause();
            },
            resume() {
                onPlay.current = true;
                runOnUI(() => {
                    'worklet';
                    showBtnPause.value = withTiming(0, {duration: 300});
                })();
                videoRefs.current?.resume();
            },
            mute() {
                videoRefs.current?.setVolume(0);
            },
        }));

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
                {translateX: -videoDimensions.width / 2},
                {translateY: -videoDimensions.height / 2},
                {scale: scale.value},
                {translateX: -focalX.value},
                {translateY: -focalY.value},
                {translateX: videoDimensions.width / 2},
                {translateY: videoDimensions.height / 2},
            ],
        }));

        const animatedLoader = useAnimatedStyle(() => ({
            opacity: loading.value ? 1 : 0,
        }));

        const animatedBtnPlayPause = useAnimatedStyle(() => ({
            opacity: showBtnPause.value,
        }));

        return (
            <>
                <GestureHandlerRootView>
                    <GestureDetector gesture={pinchGesture}>
                        <Animated.View style={animatedStyle}>
                            <Video
                                ref={videoRefs}
                                source={{uri: videoUri}}
                                style={[videoDimensions ?? styles.content, styles.videoPlayer]}
                                paused={!isPlaying || playingVideo !== index}
                                muted={isMuted}
                                onBuffer={onBuffer}
                                onLoadStart={onLoadStart}
                                onLoad={onLoad}
                                onProgress={onProgress}
                                resizeMode="contain"
                                repeat
                                controls={false}
                                disableFocus
                            />
                        </Animated.View>
                    </GestureDetector>
                </GestureHandlerRootView>
                <Pressable style={styles.controls} onPress={handlePlayPause}>
                    {/* play/pause button */}
                    <Animated.View style={[styles.playBtnWrapper, animatedBtnPlayPause]}>
                        <Row itemsCenter justifyCenter>
                            <Row itemsCenter justifyCenter style={styles.playBtn}>
                                <Icon name="ic_pause" size={32} color={colors.white} />
                            </Row>
                        </Row>
                    </Animated.View>

                    {/* loading element when vidio is load or buffering */}
                    <Animated.View style={animatedLoader}>
                        <ActivityIndicator
                            size={moderateScale(dimens.Space3XL)}
                            color={colors.B100}
                            style={styles.loader}
                        />
                    </Animated.View>

                    {/* mute/unmute button video */}
                    <View style={styles.seekerContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.muteBtn} onPress={handleMuteToggle}>
                            <Icon name={isMuted ? 'ic_mute' : 'ic_unmute'} size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </Pressable>
                {/* seeker video */}
                <Slider
                    style={styles.seeker}
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    onValueChange={onSlide}
                    theme={{
                        minimumTrackTintColor: colors.B100,
                        bubbleBackgroundColor: colors.B100,
                        maximumTrackTintColor: colors.Dark600,
                    }}
                />
            </>
        );
    },
);

export default React.memo(VideoPlayer);
