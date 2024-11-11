import {StyleSheet} from 'react-native';

import {dimens, margin, padding, verticalScale} from '@styles';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        height: verticalScale(dimens.Space3XL),
        ...padding(dimens.SpaceXS, dimens.SpaceXS),
        borderRadius: 999,
        ...margin(dimens.SpaceXS, 0, 0),
        alignSelf: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textItalic: {fontStyle: 'italic'},
});

export default styles;
