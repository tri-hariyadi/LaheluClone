import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StatusBarApp} from '@components';
import MainNavigator from '@navigations/index';
import {colors} from '@styles';

const App = () => {
    return (
        <SafeAreaProvider style={{backgroundColor: colors.white}}>
            <StatusBarApp barStyle="light-content" backgroundColor={colors.dark} />
            <MainNavigator />
        </SafeAreaProvider>
    );
};

export default App;
