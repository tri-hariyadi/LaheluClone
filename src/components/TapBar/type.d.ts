import type {ColorValue, StyleProp, ViewStyle} from 'react-native';
import type {NavigationState, Route, SceneRendererProps} from 'react-native-tab-view';

import type {TextProps} from '@components/types';

export type TabBarProps<T extends Route> = SceneRendererProps & {
    navigationState: NavigationState<T>;
    containerTabStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    keyName?: string;
    colorFocus?: ColorValue;
    colorNotFocus?: ColorValue;
    text?: TextProps;
};
