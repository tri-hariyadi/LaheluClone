import React from 'react';

import {View} from 'react-native';

import {Text} from '@components';
import {colors, dimens} from '@styles';

import type {UserMenuProps} from '../types';
import styles from './styles';

const Topic: React.FC<UserMenuProps> = ({header}) => {
    return (
        <View style={[styles.container, {paddingTop: header.headerHeight}]}>
            <Text.Bold color={colors.white} size={dimens.FontL} style={styles.text}>
                Topic Page
            </Text.Bold>
        </View>
    );
};

export default Topic;
