import React, {memo, useMemo} from 'react';

import {Text as RNText, type TextStyle} from 'react-native';

import {colors, moderateScale} from '@styles';

import type {TextComponentProps, TextProps} from './types';

const TextComponent: React.FC<TextProps> = memo(
    ({
        testID,
        children,
        font,
        size = 14,
        color = colors.dark,
        lineHeight = size * 1.5,
        numberOfLines,
        style,
        textWrap,
        strikeThrough,
        textTransform = 'none',
        onPress,
        onPressIn,
        onPressOut,
    }) => {
        const getFont = () => {
            switch (font) {
                case 'bold':
                    return 'OpenSans-Bold';
                case 'extra-bold':
                    return 'OpenSans-ExtraBold';
                case 'light':
                    return 'OpenSans-Light';
                case 'medium':
                    return 'OpenSans-Medium';
                case 'semi-bold':
                    return 'OpenSans-SemiBold';

                default:
                    return 'OpenSans-Regular';
            }
        };

        const textStyle = useMemo(() => {
            let styles: TextStyle = {
                fontFamily: getFont(),
                fontSize: moderateScale(size, 0.3),
                color,
                textTransform,
                lineHeight: moderateScale(lineHeight, 0.3),
            };

            if (textWrap) {
                styles = {...styles, flex: 1, flexWrap: 'wrap'};
            }
            if (strikeThrough) {
                styles = {...styles, textDecorationLine: 'line-through', textDecorationStyle: 'solid'};
            }
            return styles;
        }, [size, color, lineHeight, textWrap, strikeThrough, font, textTransform]);

        return (
            <RNText
                testID={testID}
                numberOfLines={numberOfLines}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={[textStyle, style]}>
                {children}
            </RNText>
        );
    },
);

const Text: TextComponentProps = props => <TextComponent {...props} />;

Text.Bold = props => <TextComponent {...props} font="bold" />;
Text.ExtraBold = props => <TextComponent {...props} font="extra-bold" />;
Text.Light = props => <TextComponent {...props} font="light" />;
Text.Medium = props => <TextComponent {...props} font="medium" />;
Text.SemiBold = props => <TextComponent {...props} font="semi-bold" />;

export default Text;
