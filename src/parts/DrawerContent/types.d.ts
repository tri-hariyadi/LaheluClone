import type {NavigatorScreenParams} from '@react-navigation/native';
import type {ViewStyle} from 'react-native';
import type {FastImageProps} from 'react-native-fast-image';
import type {SharedValue} from 'react-native-reanimated';

import type {IconProps} from '@components/types';
import type {DrawerNavigationStackParamList} from '@navigations/DrawerNavigation/types';

export type TDrawerItem = {
    name: string;
    ic: IconProps['name'] | FastImageProps['source'];
    rightIcon?: IconProps['name'];
    itemStyle?: ViewStyle;
    navigationParams?: NavigatorScreenParams<DrawerNavigationStackParamList>;
};

export type TDrawerItemHeaderLayout = {
    progress: Readonly<SharedValue<0 | 1>>;
    name: string;
};

export type TDrawerList = Array<
    TDrawerItem & {
        collapsible?: boolean;
        subMenu?: Array<TDrawerItem>;
    }
>;
