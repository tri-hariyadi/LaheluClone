import {StyleSheet} from 'react-native';

import {colors, dimens, margin, padding} from '@styles';

const styles = StyleSheet.create({
    msgContainer: {
        backgroundColor: colors.Color3,
        borderColor: colors.B100,
        borderWidth: 1,
        borderRadius: dimens.BorderRadiusM,
        ...padding(dimens.SpaceS, dimens.SpaceM),
        ...margin(dimens.SpaceM),
    },
});

export default styles;
