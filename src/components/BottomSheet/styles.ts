import {Dimensions, StyleSheet} from 'react-native';

import {colors, dimens} from '@styles';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        zIndex: 999,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: colors.Backdrop,
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderTopRightRadius: dimens.SpaceS,
        borderTopLeftRadius: dimens.SpaceS,
        overflow: 'hidden',
    },
});

export default styles;
