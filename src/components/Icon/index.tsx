import React from 'react';

import {Image, ImageSourcePropType} from 'react-native';
import Animated from 'react-native-reanimated';

import * as Icons from '@assets/icons';
import {scale} from '@styles';

import type {IconComponentProps, IconProps} from './types';

export const IconComponent: React.FC<IconProps> = ({
    name,
    size = 25,
    color,
    resizeMode = 'contain',
    style,
    testID,
    aspectRatio = 1,
}) => {
    return (
        <Image
            source={Icons[name] as ImageSourcePropType} // Ensure icon is treated as ImageSourcePropType
            resizeMode={resizeMode}
            style={[
                style,
                {
                    width: scale(size),
                    height: scale(size),
                    aspectRatio,
                },
                color ? {tintColor: color} : {},
            ]}
            accessible={true}
            accessibilityLabel={testID}
            testID={testID}
        />
    );
};

const Icon: IconComponentProps = props => <IconComponent {...props} />;

Icon.Animated = ({name, size = 25, color, resizeMode = 'contain', style, testID, aspectRatio = 1}) => {
    return (
        <Animated.Image
            source={Icons[name] as ImageSourcePropType} // Ensure icon is treated as ImageSourcePropType
            resizeMode={resizeMode}
            style={[
                color ? {tintColor: color} : {},
                style,
                {
                    width: scale(size),
                    height: scale(size),
                    aspectRatio,
                },
            ]}
            accessible={true}
            accessibilityLabel={testID}
            testID={testID}
        />
    );
};

export default Icon;
