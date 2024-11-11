import React, {type PropsWithChildren} from 'react';

import {type ViewStyle} from 'react-native';
import {type SharedValue} from 'react-native-reanimated';

import type {TextProps} from '@components/types';

export type AccordionProps = PropsWithChildren<{
    header?: (_progress: Readonly<SharedValue<0 | 1>>) => React.JSX.Element;
    headerTitle?: string;
    headerTitleStyle?: TextProps;
    style?: ViewStyle;
}>;
