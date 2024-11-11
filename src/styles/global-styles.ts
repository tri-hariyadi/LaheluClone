import {StyleSheet} from 'react-native';

import * as colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.dark,
    },
    textCenter: {
        textAlign: 'center',
    },
});

export default styles;
