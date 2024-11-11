import React, {useEffect} from 'react';

import {Dimensions, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Route} from 'react-native-tab-view';

import MainHeader from '@parts/MainHeader';
import {colors} from '@styles';

import Button from '../Button';
import Row from '../Row';
import Text from '../Text';
import styles from './styles';
import {TabBarProps} from './type';

const {width} = Dimensions.get('window');

const TapBar = <T extends Route>(props: TabBarProps<T>) => {
    const tabWidth = width / props.navigationState.routes.length;
    const underlinePosition = useSharedValue(0);

    useEffect(() => {
        // Update underline position whenever the index changes
        underlinePosition.value = withTiming(props.navigationState.index * tabWidth, {duration: 200});
    }, [props.navigationState.index]);

    const animatedUnderlineStyle = useAnimatedStyle(() => ({
        transform: [{translateX: underlinePosition.value}],
    }));

    return (
        <>
            <MainHeader />
            <Row itemsCenter style={styles.wrapper}>
                {props.navigationState.routes.map((route, i) => {
                    const isFocus = props.navigationState.index === i;
                    return (
                        <View key={`${props.keyName ?? 'TabBar'}-${i}`} style={styles.container}>
                            <Button
                                background={colors.dark}
                                isRowBlock
                                style={styles.tabBar}
                                onPress={() => props.jumpTo(route.key)}>
                                <Text.Bold
                                    size={16}
                                    lineHeight={22}
                                    {...props.text}
                                    color={
                                        isFocus ? props.colorFocus || colors.B100 : props.colorNotFocus || colors.white
                                    }>
                                    {route.title}
                                </Text.Bold>
                            </Button>
                            {/* {i === 0 && <Animated.View style={[styles.line, {transform}]} />} */}
                        </View>
                    );
                })}
                <Animated.View style={[styles.line, animatedUnderlineStyle, {width: tabWidth}]} />
            </Row>
        </>
    );
};

export default TapBar;
