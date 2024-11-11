import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';

import {
    Animated,
    BackHandler,
    Dimensions,
    KeyboardAvoidingView,
    PanResponder,
    Platform,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';

import styles from './styles';
import {BottomSheetProps, BottomSheetRefObject} from './types';

const {height: screenHight} = Dimensions.get('screen');

const BottomSheetComponent = forwardRef<BottomSheetRefObject, BottomSheetProps>(
    (
        {
            children,
            maxHeight = 86,
            onShow,
            onDismiss,
            closeOnHardwareBackPress = true,
            closeOnTouchOutside = true,
            onTouchOutside,
            containerStyle,
        },
        ref,
    ) => {
        const [visible, setVisible] = useState(false);
        const modalHeight = useRef(0);
        const panY = useRef(new Animated.Value(screenHight)).current;

        const resetPositionAnim = useRef(
            Animated.timing(panY, {
                toValue: 0,
                duration: 520,
                useNativeDriver: true,
            }),
        ).current;

        const closeAnim = useRef(
            Animated.timing(panY, {
                toValue: screenHight,
                duration: 400,
                useNativeDriver: true,
            }),
        ).current;

        const translateY = panY.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 0, 1],
        });

        const modalContainerMaxHeight: ViewStyle = {
            maxHeight: (screenHight * maxHeight) / 100,
        };

        const onBtSheetDismiss = () => {
            setVisible(v => !v);
            onDismiss?.();
        };

        const panResponder = useRef(
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (e, gs) => {
                    panY.setValue(gs.dy < 0 ? 0 : gs.dy);
                },
                onPanResponderRelease: (e, gs) => {
                    if (gs.dy > (30 / 100) * modalHeight.current || gs.vy > 0.3) {
                        return closeAnim.start(onBtSheetDismiss);
                    }
                    return resetPositionAnim.start();
                },
            }),
        ).current;

        useEffect(() => {
            if (visible) {
                resetPositionAnim.start();
                if (typeof onShow === 'function') onShow();
                BackHandler.addEventListener('hardwareBackPress', onRequestClose);
            } else {
                BackHandler.removeEventListener('hardwareBackPress', onRequestClose);
            }

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onRequestClose);
            };
        }, [visible]);

        const dismissModal = () => {
            closeAnim.start(() => {
                setVisible(false);
                onDismiss?.();
            });
        };

        const show = () => {
            panY.setValue(screenHight);
            setVisible(true);
        };

        const onTouchOutsideModal = () => {
            if (closeOnTouchOutside) {
                dismissModal();
                if (onTouchOutside) onTouchOutside();
            }
        };

        const onRequestClose = () => {
            if (closeOnHardwareBackPress) {
                dismissModal();
            }
            return true;
        };

        useImperativeHandle(ref, () => ({
            dismiss: dismissModal,
            show,
        }));

        if (!visible) {
            return null;
        }

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.wrapper}>
                    {/* ========================= Overlay Bottom Sheet ========================= */}
                    <TouchableWithoutFeedback onPress={onTouchOutsideModal}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[
                            styles.modalContainer,
                            modalContainerMaxHeight,
                            containerStyle,
                            {transform: [{translateY}]},
                        ]}
                        onLayout={e => (modalHeight.current = e.nativeEvent.layout.height)}>
                        {children}
                    </Animated.View>
                </KeyboardAvoidingView>
            </View>
        );
    },
);

export default BottomSheetComponent;
