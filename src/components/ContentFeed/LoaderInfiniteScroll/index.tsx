import React from 'react';

import {ActivityIndicator, View} from 'react-native';

import {Button, Gap, Show, Text} from '@components';
import {colors, dimens, scale} from '@styles';

import styles from './styles';

const LoaderInfiniteScroll: React.FC<{isLast: boolean}> = ({isLast}) => {
    return (
        <View>
            <Gap height={dimens.SpaceXL} />
            <Show>
                <Show.When isTrue={!isLast}>
                    <ActivityIndicator size={scale(dimens.Font2XL)} color={colors.B100} />
                </Show.When>
                <Show.Else>
                    <Button isOutlineButton background={colors.white} rippleColor="transparent" style={styles.empty}>
                        <Text size={dimens.FontS} color={colors.white}>
                            Tidak ada konten lagi
                        </Text>
                    </Button>
                </Show.Else>
            </Show>
            <Gap height={dimens.Space3XL} />
        </View>
    );
};

export default LoaderInfiniteScroll;
