import React, {memo, useMemo} from 'react';

import {Image, type ImageStyle, StyleSheet} from 'react-native';

import * as Images from '@assets/images';
import {moderateScale, scale} from '@styles';

import type {ImageComponentProps} from './types';

const ImageComponent: React.FC<ImageComponentProps> = ({name, size, borderRadius, ...props}) => {
    const imageStyle = useMemo(() => {
        const styles: ImageStyle = {...StyleSheet.flatten(props.style)};
        if (size) {
            styles.width = scale(size);
            styles.height = scale(size);
        }

        if (borderRadius) {
            styles.borderRadius = moderateScale(borderRadius);
        }
        return styles;
    }, [size, borderRadius, props.style]);

    return <Image {...props} style={imageStyle} source={props.source ?? Images[name as keyof typeof Images]} />;
};

export default memo(ImageComponent);
