import React, {useCallback} from 'react';

import {
    BottomTabBarButtonProps,
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import BottomSheetMenu from '@screens/BottomSheetMenu';
import Home from '@screens/Home';
import Users from '@screens/Users';
import {colors, dimens, scale} from '@styles';

import TabButton from './TabButton.tsx';
import {BottomTabStackParamList, TabArrList} from './types';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const BlankPage = () => null;

const BottomNavigation = () => {
    const TabArr: Array<TabArrList & {options?: BottomTabNavigationOptions}> = [
        {
            name: 'Beranda',
            component: Home,
            inActiveIcon: 'ic_home',
            options: {
                headerShown: false,
            },
        },
        {
            name: 'Users',
            component: Users,
            inActiveIcon: 'ic_users',
            options: {
                headerShown: false,
            },
        },
        {
            name: 'Add',
            component: BottomSheetMenu,
            inActiveIcon: 'ic_add',
        },
        {
            name: 'Notification',
            component: BlankPage,
            inActiveIcon: 'ic_notification',
        },
        {
            name: 'Profile',
            component: BlankPage,
            inActiveIcon: 'img_profile',
        },
    ];

    const TabBarButton = useCallback(
        (props: BottomTabBarButtonProps, item: TabArrList) => <TabButton {...props} item={item} />,
        [],
    );

    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {alignContent: 'center'}, lazy: false}} initialRouteName="Beranda">
            {TabArr.map((routeConfig, index) => (
                <Tab.Screen
                    key={`${routeConfig.name}-${index}`}
                    name={routeConfig.name}
                    component={routeConfig.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: props => TabBarButton(props, routeConfig),
                        tabBarStyle: {
                            height: scale(dimens.ClickSizeL),
                            backgroundColor: colors.dark,
                            borderTopWidth: 1,
                            borderTopColor: colors.Dark600,
                        },
                        ...routeConfig.options,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default BottomNavigation;
