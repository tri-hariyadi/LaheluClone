import {StyleSheet} from 'react-native';

import {colors, dimens, dimensions, margin, roundedFull} from '@styles';

const styles = StyleSheet.create({
    controls: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    videoPlayer: {
        backgroundColor: colors.N200,
    },
    playBtnWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playBtn: {
        ...dimensions(dimens.ClickSizeL),
        backgroundColor: colors.dark,
        borderRadius: roundedFull(dimens.ClickSizeL),
    },
    seekerContainer: {
        position: 'absolute',
        bottom: dimens.SpaceM,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
    },
    seeker: {
        width: '100%',
        padding: 0,
        margin: 0,
    },
    muteBtn: {
        alignSelf: 'flex-end',
        ...margin(0, dimens.SpaceM),
        backgroundColor: colors.Backdrop,
        ...dimensions(dimens.ClickSizeS),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: roundedFull(dimens.ClickSizeS),
    },
    loader: {
        position: 'absolute',
        right: dimens.SpaceM,
        top: dimens.SpaceM,
    },
    separator: {
        backgroundColor: colors.Dark600,
        width: '100%',
        height: dimens.Space2XS,
        ...margin(dimens.SpaceM, 0, 0),
    },
});

export default styles;
