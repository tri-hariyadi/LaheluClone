import {ViewStyle} from 'react-native';

import {moderateScale, moderateVerticalScale, scale, verticalScale} from './scalling-utils';

const spacing = (top: number, right = top, bottom = top, left = right, property: 'margin' | 'padding') => {
    let styles: ViewStyle = {};

    styles[`${property}Right`] = moderateScale(right);
    styles[`${property}Left`] = moderateScale(left);

    if (top === right) {
        styles[`${property}Top`] = moderateScale(top);
        styles[`${property}Bottom`] = moderateScale(bottom);
    } else {
        styles[`${property}Top`] = moderateVerticalScale(top);
        styles[`${property}Bottom`] = moderateVerticalScale(bottom);
    }

    return styles;
};

export const margin = (top: number, right?: number, bottom?: number, left?: number) => {
    return spacing(top, right, bottom, left, 'margin');
};

export const padding = (top: number, right?: number, bottom?: number, left?: number) => {
    return spacing(top, right, bottom, left, 'padding');
};

export const dimensions = <T extends ViewStyle>(width: number, height = width): T => {
    const styles = {} as T;
    styles.width = scale(width);
    if (height === width) {
        styles.height = scale(height);
    } else {
        styles.height = verticalScale(height);
    }

    return styles;
};

export const roundedFull = (size: number): number => {
    return scale(size) / 2;
};
