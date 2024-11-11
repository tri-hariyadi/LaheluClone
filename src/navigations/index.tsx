import React from 'react';

import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import SplashScreen from '@screens/SplashScreen';
import ErrorUtils from '@utils/ErrorUtils.ts';

import DrawerNavigation from './DrawerNavigation';
import ModalRoutes from './ModalRoutes';
import type {AppStackParamList} from './types';

export const Stack = createNativeStackNavigator<AppStackParamList>();

export const navigationRef = createNavigationContainerRef<any>();

export const navigate = <RouteName extends keyof AppStackParamList>(
    ...args: undefined extends AppStackParamList[RouteName]
        ? [screen: RouteName] | [screen: RouteName, params: AppStackParamList[RouteName]]
        : [screen: RouteName, params: AppStackParamList[RouteName]]
) => {
    try {
        navigationRef.current?.navigate(...args);
    } catch (error) {
        ErrorUtils.consoleError('Navigation', error, 'error when invoke navigate()');
    }
};

const MainNavigator = () => {
    const {top} = useSafeAreaInsets();

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{headerShown: false, animation: 'fade'}}
                    />
                    <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{headerShown: false}} />
                    {ModalRoutes()}
                </Stack.Navigator>
            </NavigationContainer>
            <SafeAreaView style={{backgroundColor: 'transparent', marginBottom: -top}} />
        </>
    );
};

export default MainNavigator;
