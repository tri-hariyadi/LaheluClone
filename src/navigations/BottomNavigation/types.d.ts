import React from 'react';

import type {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';

import type {IconProps, ImageInternalSource} from '@components/types';

export type BottomTabStackParamList = {
    Beranda: {indexTab?: number};
    Users: {indexTab?: number};
    Add: undefined;
    Notification: undefined;
    Profile: undefined;
};

export type TabArrList = {
    name: keyof BottomTabStackParamList;
    component: React.ComponentType<any>; // Use React.ComponentType to represent any React component
    activeIcon?: IconProps['name'];
    inActiveIcon: IconProps['name'] | ImageInternalSource['name'];
};

export interface TabButtonProps extends BottomTabBarButtonProps {
    item: TabArrList;
}
