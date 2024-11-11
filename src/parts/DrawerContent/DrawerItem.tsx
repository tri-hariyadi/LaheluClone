import React, {useCallback} from 'react';

import {
    DrawerActions,
    getPathFromState,
    NavigationProp,
    NavigatorScreenParams,
    useNavigation,
} from '@react-navigation/native';
import {View} from 'react-native';
import type {FastImageProps} from 'react-native-fast-image';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {Accordion, Button, Gap, Icon, ProgressiveImage, Row, Show, Text} from '@components';
import type {IconProps} from '@components/types';
import {DrawerNavigationStackParamList} from '@navigations/DrawerNavigation/types';
import {navigate, navigationRef} from '@navigations/index';
import {AppStackParamList} from '@navigations/types';
import {colors, dimens} from '@styles';

import styles from './styles';
import type {TDrawerItem, TDrawerItemHeaderLayout, TDrawerList} from './types';

const HeaderLayout: React.FC<TDrawerItemHeaderLayout> = ({progress, name}) => {
    const iconStyle = useAnimatedStyle(
        () => ({
            transform: [{rotate: `${progress.value * -180}deg`}],
        }),
        [progress],
    );

    return (
        <View style={styles.itemContainer}>
            <Row itemsCenter justifyBetween>
                <Text.ExtraBold color={colors.white}>{name}</Text.ExtraBold>
                <Animated.View style={iconStyle}>
                    <Icon name="ic_triangle" size={18} style={{transform: [{rotate: '180deg'}]}} color={colors.white} />
                </Animated.View>
            </Row>
        </View>
    );
};

const ItemLayout: React.FC<TDrawerItem> = ({ic, name, navigationParams}) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const path = getPathFromState(navigation.getState());
    const screen = path.split('/')?.[2];
    const paramScreen = path.split('?')?.[0]?.split('/');
    const paramTabIndex = path.split('?')?.[1]?.split('=')?.[1];

    const nav = navigationParams as NavigatorScreenParams<DrawerNavigationStackParamList>;

    const backgroundStyle = useAnimatedStyle(() => {
        if (nav?.params && screen === nav?.screen) {
            if (
                paramScreen[paramScreen.length - 1] === nav?.params?.screen &&
                Number(paramTabIndex) === nav?.params.params?.indexTab
            ) {
                return {
                    backgroundColor: colors.B100,
                };
            }
        }
        if (!nav?.params && screen === nav?.screen) {
            return {
                backgroundColor: colors.B100,
            };
        }
        if (nav?.params?.params?.indexTab === 0 && nav?.params.screen === 'Beranda' && isNaN(Number(paramTabIndex))) {
            return {
                backgroundColor: colors.B100,
            };
        }
        return {backgroundColor: 'transparent'};
    });

    const onPress = () => {
        if (navigationParams) {
            navigationRef.current?.dispatch(DrawerActions.closeDrawer());
            navigate('DrawerNavigation', navigationParams);
        }
    };

    return (
        <Animated.View style={[styles.active, backgroundStyle]}>
            <Button isBlock background="transparent" style={styles.itemContainer} onPress={onPress}>
                <Row itemsCenter>
                    <Row flex={1}>
                        <Show>
                            <Show.When isTrue={typeof ic !== 'string'}>
                                <ProgressiveImage
                                    source={ic as FastImageProps['source']}
                                    style={styles.imgProgressive}
                                />
                            </Show.When>
                            <Show.Else>
                                <Icon name={ic as IconProps['name']} size={20} color={colors.white} />
                            </Show.Else>
                        </Show>
                        <Gap width={dimens.SpaceS} />
                        <Text.SemiBold color={colors.white}>{name}</Text.SemiBold>
                    </Row>
                    <Show.When isTrue={typeof ic !== 'string'}>
                        <Icon name="ic_star_outline" size={20} color={colors.white} />
                    </Show.When>
                </Row>
            </Button>
        </Animated.View>
    );
};

const DrawerItem: React.FC<TDrawerList[number]> = ({name, ic, collapsible, subMenu, itemStyle, navigationParams}) => {
    const _headerLayout = useCallback(
        (progress: TDrawerItemHeaderLayout['progress']) => <HeaderLayout progress={progress} name={name} />,
        [],
    );

    return (
        <Show>
            <Show.When isTrue={!collapsible}>
                <ItemLayout ic={ic} name={name} navigationParams={navigationParams} />
            </Show.When>
            <Show.Else>
                <Accordion header={_headerLayout} style={itemStyle}>
                    {subMenu?.map((value, index) => (
                        <ItemLayout
                            key={`collapsible-sidebar-menu-${index}`}
                            ic={value.ic}
                            name={value.name}
                            navigationParams={value.navigationParams}
                        />
                    ))}
                </Accordion>
            </Show.Else>
        </Show>
    );
};

export default DrawerItem;
