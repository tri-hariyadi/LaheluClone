import React, {useCallback} from 'react';

import {Drawer} from '@navigations/DrawerNavigation';
import {DrawerStackParams} from '@navigations/DrawerNavigation/types';
import MainHeader from '@parts/MainHeader';
import Random from '@screens/Random';
import Ranking from '@screens/Ranking';
import Stored from '@screens/Stored';

import {OtherMemeStackParamList} from './types';

const OtherMeme = () => {
    const routes: DrawerStackParams<OtherMemeStackParamList> = [
        {
            name: 'Peringkat',
            component: Ranking,
        },
        {
            name: 'Acak',
            component: Random,
        },
        {
            name: 'Tersimpan',
            component: Stored,
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

export default OtherMeme;
