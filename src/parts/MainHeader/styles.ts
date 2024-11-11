import {StyleSheet} from 'react-native';

import {colors, dimens, dimensions, padding} from '@styles';

const styles = StyleSheet.create({
    container: {
        ...padding(dimens.SpaceM),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.dark,
        borderBottomWidth: 1,
        borderBottomColor: colors.Dark600,
    },
    burgerBtn: {
        ...dimensions(dimens.ClickSizeM),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 900,
    },
});

export default styles;
