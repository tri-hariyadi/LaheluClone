import {StyleSheet} from 'react-native';

import {dimens, padding} from '@styles';

const styles = StyleSheet.create({
    empty: {
        ...padding(dimens.Space2XS, dimens.SpaceS),
        alignSelf: 'center',
        borderRadius: 999,
    },
});

export default styles;
