import {PropsWithChildren} from 'react';

import type {ViewStyle} from 'react-native';

export type BottomSheetProps = PropsWithChildren<{
    maxHeight?: number;
    onShow?: () => void;
    onDismiss?: () => void;
    closeOnTouchOutside?: boolean;
    onTouchOutside?: () => void;
    closeOnHardwareBackPress?: boolean;
    containerStyle?: ViewStyle;
}>;

export type BottomSheetRefObject = {
    dismiss: () => void;
    show: () => void;
};
