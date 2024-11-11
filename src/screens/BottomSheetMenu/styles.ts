import {StyleSheet} from 'react-native';

import {colors, dimens, dimensions, padding} from '@styles';

const styles = StyleSheet.create({
    header: {
        ...padding(dimens.SpaceXS, dimens.SpaceM),
        borderBottomWidth: 1,
        borderBottomColor: colors.Dark600,
    },
    closeBtn: {
        ...dimensions(dimens.ClickSizeM),
        alignSelf: 'auto',
        borderRadius: 900,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btSheetContainer: {
        backgroundColor: colors.dark,
    },
});

export default styles;
