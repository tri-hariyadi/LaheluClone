import type {ColorValue, ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';
import type {FastImageProps} from 'react-native-fast-image';

export interface ProgressiveImageProps extends FastImageProps {
    defaultErrorImageSource?: ImageSourcePropType;
    activityIndicatorColor?: ColorValue;
    activityIndicatorSize?: number;
    containerStyle?: StyleProp<ViewStyle>;
}
