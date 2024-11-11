import React, {useCallback} from 'react';

import {Drawer} from '@navigations/DrawerNavigation';
import {DrawerStackParams} from '@navigations/DrawerNavigation/types';
import MainHeader from '@parts/MainHeader';
import Donatur from '@screens/Donatur';
import Medali from '@screens/Medali';
import OtherStore from '@screens/OtherStore';

import {ExplorationStackParamList} from './types';

const ExplorationRoutes = () => {
    const routes: DrawerStackParams<ExplorationStackParamList> = [
        {
            name: 'Donatur',
            component: Donatur,
        },
        {
            name: 'Medali',
            component: Medali,
        },
        {
            name: 'OtherStore',
            component: OtherStore,
        },
    ];

    const header = useCallback(() => <MainHeader />, []);

    return (
        <Drawer.Group screenOptions={{header, headerShown: true}}>
            {routes.map(routeConfig => (
                <Drawer.Screen key={routeConfig.name} {...routeConfig} />
            ))}
        </Drawer.Group>
    );
};

export default ExplorationRoutes;
