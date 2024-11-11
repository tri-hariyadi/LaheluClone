import React from 'react';

import {ColorValue, StyleProp, TextStyle} from 'react-native';

export type TextProps = {
    testID?: string;
    children?: React.ReactElement | React.ReactNode | string;
    font?: 'bold' | 'extra-bold' | 'light' | 'medium' | 'semi-bold' | 'regular';
    size?: number;
    color?: ColorValue;
    lineHeight?: number;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    textWrap?: boolean;
    strikeThrough?: boolean;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
};

export type TextComponentProps = React.FC<TextProps> & {Bold: React.FC<TextProps>} & {
    ExtraBold: React.FC<TextProps>;
} & {Light: React.FC<TextProps>} & {Medium: React.FC<TextProps>} & {SemiBold: React.FC<TextProps>};
