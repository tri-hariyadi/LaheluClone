import {StyleSheet} from 'react-native';
import type {ImageStyle} from 'react-native-fast-image';

import {dimens, dimensions, margin, padding, roundedFull} from '@styles';

const styles = StyleSheet.create({
    container: {
        gap: dimens.SpaceS,
        ...margin(0, 0, dimens.SpaceS),
        ...padding(dimens.SpaceM, dimens.SpaceM, 0),
    },
    profile: {
        gap: dimens.SpaceXS,
    },
    imgProfile: {
        ...dimensions<ImageStyle>(30),
        borderRadius: roundedFull(30),
    },
    dotButton: {
        ...dimensions(30),
        borderRadius: roundedFull(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
