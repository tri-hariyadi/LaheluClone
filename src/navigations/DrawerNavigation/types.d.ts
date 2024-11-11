import type {ComponentProps} from 'react';

import type {NavigatorScreenParams} from '@react-navigation/native';

import type {BottomTabStackParamList} from '@navigations/BottomNavigation/types';
import {ExplorationStackParamList} from '@navigations/ExplorationRoutes/types';
import {OtherMemeStackParamList} from '@navigations/OtherMemeRoutes/types';

import {Drawer} from '.';

// eslint-disable-next-line no-unused-vars
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type DrawerAppParamList<T extends Array<Record<string, object | undefined>>> = {
    Home: NavigatorScreenParams<BottomTabStackParamList>;
} & {
    [P in keyof UnionToIntersection<T[number]>]: UnionToIntersection<T[number]>[P];
};

export type DrawerNavigationStackParamList = DrawerAppParamList<[OtherMemeStackParamList, ExplorationStackParamList]>;

// export type DrawerNavigationStackParamList = {
//     Home: NavigatorScreenParams<BottomTabStackParamList>;
//     OtherMeme: OtherMemeStackParamList;
// };

export type DrawerStackParams<T> = Array<ComponentProps<typeof Drawer.Screen> & {name: keyof T}>;
