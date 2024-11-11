import {StyleSheet} from 'react-native';

import {colors, dimens, dimensions, margin, padding, roundedFull, verticalScale} from '@styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
    header: {
        ...padding(dimens.SpaceS, dimens.SpaceM),
        borderBottomWidth: 1,
        borderBottomColor: colors.N200,
    },
    btnClose: {
        ...dimensions(dimens.ClickSizeM),
        alignSelf: 'auto',
        borderRadius: roundedFull(dimens.ClickSizeM),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderColor: colors.N200,
        backgroundColor: colors.N300,
        borderRadius: dimens.BorderRadiusM,
        height: verticalScale(dimens.ClickSizeM),
        ...padding(0, dimens.SpaceS),
        justifyContent: 'center',
        ...margin(0, dimens.SpaceM),
    },
});

export default styles;
