import {StyleSheet} from 'react-native';

import {colors, dimens, moderateScale, padding, scale} from '@styles';

const styles = StyleSheet.create({
    container: {
        gap: moderateScale(dimens.SpaceS),
        ...padding(dimens.SpaceM, dimens.SpaceM, 0),
    },
    btnTag: {
        height: scale(dimens.SpaceXL),
        ...padding(dimens.SpaceXS),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
    },
    btnTagWrapper: {
        gap: moderateScale(dimens.SpaceXS),
    },
    row: {
        gap: moderateScale(dimens.SpaceXS),
    },
    btnActionWrapper: {
        flex: 1,
        gap: moderateScale(dimens.SpaceXS),
    },
    btnAction: {
        height: scale(dimens.ClickSizeM),
        ...padding(0, dimens.SpaceS),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: dimens.BorderRadiusM,
    },
    btnLike: {
        borderTopLeftRadius: dimens.BorderRadiusM,
        borderBottomLeftRadius: dimens.BorderRadiusM,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: colors.N300,
        borderRightWidth: 0,
    },
    btnDissLike: {
        borderWidth: 1,
        borderColor: colors.N300,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: dimens.BorderRadiusM,
        borderBottomRightRadius: dimens.BorderRadiusM,
    },
});

export default styles;
