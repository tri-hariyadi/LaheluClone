import React from 'react';

import {View} from 'react-native';

import {Text} from '@components';
import {colors, dimens, globalStyles} from '@styles';

const Random = () => {
    return (
        <View style={globalStyles.container}>
            <Text.Bold color={colors.white} size={dimens.FontL} style={globalStyles.textCenter}>
                Halaman Acak
            </Text.Bold>
        </View>
    );
};

export default Random;
