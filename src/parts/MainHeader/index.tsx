import React from 'react';

import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';

import {Button, Gap, Icon, Text} from '@components';
import {navigate, navigationRef} from '@navigations/index';
import {colors} from '@styles';

import styles from './styles';

const MainHeader = () => {
    const openDrawer = () => navigationRef.current?.dispatch(DrawerActions.openDrawer());
    const onSearch = () => navigate('Search');

    return (
        <View style={styles.container}>
            <Button background="transparent" style={styles.burgerBtn} onPress={openDrawer}>
                <Icon name="ic_burger_bar" size={20} color={colors.white} />
            </Button>
            <Gap width={10} />
            <Text.ExtraBold size={20} color={colors.B100} style={{flex: 1}}>
                LAHELU
            </Text.ExtraBold>
            <Button background="transparent" style={styles.burgerBtn} onPress={onSearch}>
                <Icon name="ic_search" size={25} color={colors.white} />
            </Button>
        </View>
    );
};

export default MainHeader;
