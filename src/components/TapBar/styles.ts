import {StyleSheet} from 'react-native';

import {colors, verticalScale} from '@styles';

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.Dark600,
    },
    container: {
        flex: 1,
        // height: '100%',
    },
    tabBar: {
        height: verticalScale(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 2,
        width: '100%',
        backgroundColor: colors.B100,
        zIndex: 9,
        position: 'absolute',
        bottom: 0,
    },
});

export default styles;
