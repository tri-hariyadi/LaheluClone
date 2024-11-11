import React, {useCallback} from 'react';

import {createDrawerNavigator, type DrawerContentComponentProps} from '@react-navigation/drawer';

import BottomNavigation from '@navigations/BottomNavigation';
import ExplorationRoutes from '@navigations/ExplorationRoutes';
import OtherMeme from '@navigations/OtherMemeRoutes';
import DrawerContent from '@parts/DrawerContent';

import type {DrawerNavigationStackParamList} from './types';

export const Drawer = createDrawerNavigator<DrawerNavigationStackParamList>();

const DrawerNavigation = () => {
    const drawerContent = useCallback<(_props: DrawerContentComponentProps) => React.ReactNode>(
        props => <DrawerContent {...props} />,
        [],
    );

    return (
        <Drawer.Navigator drawerContent={drawerContent}>
            <Drawer.Screen name="Home" component={BottomNavigation} options={{headerShown: false}} />
            {OtherMeme()}
            {ExplorationRoutes()}
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
