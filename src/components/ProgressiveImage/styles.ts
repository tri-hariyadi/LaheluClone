import {StyleSheet} from 'react-native';

import {colors} from '@styles';

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'row',
        alignSelf: 'baseline',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        backgroundColor: colors.N100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        position: 'absolute',
    },
    skeleton: {
        width: '100%',
        height: '100%',
    },
});

export default styles;
