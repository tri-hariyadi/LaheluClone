import React from 'react';

import {StatusBar, View, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import type {StatusBarAppProps} from './types';

const StatusBarAppComponent: React.FC<StatusBarAppProps> = ({
    barStyle,
    backgroundColor = 'transparent',
    isTranlucentStatusBar,
    ...props
}) => {
    const {top} = useSafeAreaInsets();
    const statusBarAppStyle: ViewStyle = {
        backgroundColor: backgroundColor,
        height: isTranlucentStatusBar ? 0 : top,
        // barStyle: barStyle,
    };

    return (
        <View style={statusBarAppStyle}>
            <SafeAreaView>
                <StatusBar
                    translucent
                    barStyle={barStyle || 'dark-content'}
                    backgroundColor={backgroundColor}
                    {...props}
                />
            </SafeAreaView>
        </View>
    );
};

export default StatusBarAppComponent;
