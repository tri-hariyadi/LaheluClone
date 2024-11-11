import {StyleSheet} from 'react-native';

import {colors, dimens, dimensions, padding, roundedFull, scale} from '@styles';

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
    contentWrapper: {
        ...padding(0, dimens.SpaceM),
    },
    btnNotif: {
        justifyContent: 'center',
        alignItems: 'center',
        ...padding(dimens.SpaceS, dimens.SpaceM),
        borderRadius: scale(dimens.BorderRadiusM),
        borderColor: colors.N300,
        borderWidth: 1,
    },
    text: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default styles;
