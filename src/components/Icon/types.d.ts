import {ColorValue, ImageResizeMode, ImageStyle} from 'react-native';

import * as Icons from '@assets/icons';

export interface IconProps {
    name: keyof typeof Icons;
    size?: number;
    color?: ColorValue;
    resizeMode?: ImageResizeMode;
    aspectRatio?: number;
    testID?: string;
    style?: ImageStyle;
}

export type IconComponentProps = React.FC<IconProps> & {Animated: React.FC<IconProps>};
