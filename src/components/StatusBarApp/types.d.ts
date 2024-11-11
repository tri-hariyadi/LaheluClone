import {ColorValue, StatusBarProps} from 'react-native';

export interface StatusBarAppProps extends StatusBarProps {
    backgroundColor?: ColorValue;
    isTranlucentStatusBar?: boolean;
    barStyle: 'light-content' | 'dark-content' | undefined;
}
