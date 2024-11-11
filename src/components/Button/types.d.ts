import {type GestureResponderEvent, type StyleProp, type ViewStyle} from 'react-native';

export type ButtonProps = {
    children?: ReactElement | ReactNode | string;
    // Make button block (fill the available space) when the parent or the component that wraps the button is had flexDirection `column`
    isBlock?: boolean;
    // Make button block (fill the available space) when the parent or the component that wraps the button is had flexDirection `row`
    isRowBlock?: boolean;
    isOutlineButton?: boolean;
    background?: ColorValue;
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    rippleColor?: ColorValue;
    onPress?: (_event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
};
