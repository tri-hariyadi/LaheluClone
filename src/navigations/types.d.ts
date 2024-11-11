import type {ComponentProps} from 'react';

import type {NavigatorScreenParams} from '@react-navigation/native';

import type {DrawerNavigationStackParamList} from './DrawerNavigation/types';
import type {ModalStackParamList} from './ModalRoutes/types';

import {Stack} from '.';

export type RoutesStackParams<T> = Array<
    ComponentProps<typeof Stack.Screen> & {headerTitle?: string} & {name: keyof T}
>;

// Utility type untuk menggabungkan properti dari objek dalam tuple menjadi satu objek
// eslint-disable-next-line no-unused-vars
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type MainAppParamList<T extends Array<Record<string, object | undefined>>> = {
    DrawerNavigation: NavigatorScreenParams<DrawerNavigationStackParamList>;
    SplashScreen: undefined;
} & {
    [P in keyof UnionToIntersection<T[number]>]: UnionToIntersection<T[number]>[P];
};

export type AppStackParamList = MainAppParamList<
    [
        ModalStackParamList,
        /* ...other stack param list */
    ]
>;
