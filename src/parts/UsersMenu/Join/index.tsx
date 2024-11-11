import React from 'react';

import {View} from 'react-native';

import {Button, Gap, Text} from '@components';
import {colors, dimens} from '@styles';

import type {UserMenuProps} from '../types';
import styles from './styles';

const Join: React.FC<UserMenuProps> = ({header}) => {
    return (
        <View style={[{paddingTop: header.headerHeight}]}>
            <Gap height={dimens.SpaceM} />
            <View style={styles.container}>
                <Text color={colors.ColorFill3} style={styles.textItalic}>
                    topic sudah habis
                </Text>
                <Button isOutlineButton style={styles.button}>
                    <Text.Bold color={colors.B100} lineHeight={dimens.FontM}>
                        Cek ulang
                    </Text.Bold>
                </Button>
            </View>
        </View>
    );
};

export default Join;
