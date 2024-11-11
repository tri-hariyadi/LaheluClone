import React from 'react';

import type {RoutesStackParams} from '@navigations/types';
import BottomSheetMenu from '@screens/BottomSheetMenu';
import Notification from '@screens/Notification';
import Search from '@screens/Search';

import {Stack} from '..';
import type {ModalStackParamList} from './types';

const ModalRoutes = () => {
    const routes: RoutesStackParams<ModalStackParamList> = [
        {
            name: 'BottomSheetMenu',
            component: BottomSheetMenu,
            options: {animation: 'none'},
        },
        {
            name: 'Search',
            component: Search,
            options: {animation: 'slide_from_right'},
        },
        {
            name: 'Notifications',
            component: Notification,
            options: {animation: 'slide_from_right'},
        },
    ];

    return (
        <Stack.Group screenOptions={{headerShown: false, presentation: 'transparentModal'}}>
            {routes.map(routeConfig => (
                <Stack.Screen key={routeConfig.name} {...routeConfig} />
            ))}
        </Stack.Group>
    );
};

export default ModalRoutes;
