import {StyleSheet} from 'react-native';

import {dimens, padding, scale} from '@styles';

const styles = StyleSheet.create({
    container: {
        ...padding(dimens.SpaceXS, 0),
    },
    itemContainer: {
        ...padding(0, dimens.SpaceXL),
    },
    item: {
        height: scale(dimens.ClickSizeM),
    },
});

export default styles;
