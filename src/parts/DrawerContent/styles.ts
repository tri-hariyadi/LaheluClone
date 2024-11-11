import {StyleSheet} from 'react-native';
import type {ImageStyle} from 'react-native-fast-image';

import {colors, dimens, dimensions, moderateScale, padding, scale, verticalScale} from '@styles';

const styles = StyleSheet.create({
    container: {},
    itemContainer: {
        height: verticalScale(dimens.ClickSizeM),
        justifyContent: 'center',
        ...padding(0, dimens.SpaceXL),
    },
    lineSeparator: {
        height: 0.5,
        backgroundColor: colors.white,
    },
    listPadding: {
        ...padding(0, dimens.SpaceXL),
    },
    infoMenuContainer: {
        flexWrap: 'wrap',
        gap: moderateScale(dimens.SpaceXS),
    },
    imgProgressive: {
        ...dimensions<ImageStyle>(dimens.FontXL),
        borderRadius: scale(dimens.BorderRadiusS),
    },
    active: {
        width: '100%',
    },
});

export default styles;
