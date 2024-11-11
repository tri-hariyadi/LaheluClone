import React, {useEffect} from 'react';

import {View} from 'react-native';

import {Image} from '@components';
import {navigate} from '@navigations/index';
import {dimens} from '@styles';

import styles from './styles';

const SplashScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            navigate('DrawerNavigation', {screen: 'Home', params: {screen: 'Beranda', params: {indexTab: 0}}});
        }, 300);
    }, []);

    return (
        <View style={styles.container}>
            <Image name="img_lahelu_logo" size={dimens.LogoSize} />
        </View>
    );
};

export default SplashScreen;
