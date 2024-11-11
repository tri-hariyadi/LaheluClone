import React, {useCallback, useMemo, useState} from 'react';

import {type RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {Dimensions, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {type NavigationState, type SceneRendererProps, TabView} from 'react-native-tab-view';

import {TapBar} from '@components';
import type {BottomTabStackParamList} from '@navigations/BottomNavigation/types';
import {Join, Topic} from '@parts/UsersMenu';
import {useAnimatedHeader} from '@utils/hooks';

import styles from './styes';

const {width: screenWidth} = Dimensions.get('window');

const Users = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const routes = useMemo(
        () => [
            {key: 'topic', title: 'Topik'},
            {key: 'join', title: 'Sudah gabung'},
        ],
        [],
    );
    const header = useAnimatedHeader();

    const _renderTabBar = useCallback(
        (tabBarProps: SceneRendererProps & {navigationState: NavigationState<(typeof routes)[number]>}) => (
            <Animated.View onLayout={header.setHeaderHeight} style={header.animatedHeaderStyle}>
                <TapBar {...tabBarProps} text={{size: 14}} />
            </Animated.View>
        ),
        [header],
    );

    const renderScene = useCallback(
        ({route}: {route: {key: string}}) => {
            switch (route.key) {
                case 'topic':
                    return <Topic header={header} />;
                case 'join':
                    return <Join header={header} />;
                default:
                    return null;
            }
        },
        [header],
    );

    const route = useRoute<RouteProp<BottomTabStackParamList, 'Users'>>();
    useFocusEffect(
        useCallback(() => {
            setTabIndex(route.params?.indexTab || 0);
        }, [route]),
    );

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{index: tabIndex, routes}}
                renderScene={renderScene}
                onIndexChange={setTabIndex}
                initialLayout={{width: screenWidth}}
                renderTabBar={_renderTabBar}
                overScrollMode="never"
                lazy={true}
            />
        </View>
    );
};

export default Users;
