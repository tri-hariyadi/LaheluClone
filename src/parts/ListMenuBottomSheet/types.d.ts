import type {TextStyle} from 'react-native';

import {IconProps} from '@components/types';

export type TListMenu = {
    name: string;
    ic: IconProps['name'];
    textStyle?: TextStyle;
};

export type TNestedListMenu = Array<{
    data: Array<TListMenu>;
}>;
