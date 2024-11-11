import React, {useEffect} from 'react';

import {GestureResponderEvent, View} from 'react-native';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {Button, Icon, Image, Show} from '@components';
import {IconProps, ImageInternalSource} from '@components/types';
import {colors} from '@styles';

import {navigate} from '..';
import styles from './styles';
import {TabButtonProps} from './types';

const TabButton: React.FC<TabButtonProps> = ({item, onPress, accessibilityState}) => {
    const tintColor = useSharedValue(colors.white);
    const focused = accessibilityState?.selected;

    const animatedStyle = useAnimatedStyle(() => ({
        tintColor: tintColor.value,
    }));

    useEffect(() => {
        if (focused) {
            tintColor.value = withTiming(colors.B100, {duration: 300});
        } else {
            tintColor.value = withTiming(colors.white, {duration: 300});
        }
    }, [focused]);

    const handlePress = (e: GestureResponderEvent) => {
        switch (item.name) {
            case 'Add':
                navigate('BottomSheetMenu', {type: 'Add'});
                break;
            case 'Notification':
                navigate('Notifications');
                break;
            case 'Profile':
                navigate('BottomSheetMenu', {type: 'Profile'});
                break;

            default:
                onPress?.(e);
                break;
        }
    };

    return (
        <Button isBlock background="transparent" style={styles.btn} onPress={handlePress}>
            <View style={styles.container}>
                <Show>
                    <Show.When isTrue={item.name === 'Profile'}>
                        <Image
                            name={item.inActiveIcon as ImageInternalSource['name']}
                            size={22}
                            style={styles.profileImg}
                        />
                    </Show.When>
                    <Show.Else>
                        <Icon.Animated name={item.inActiveIcon as IconProps['name']} size={20} style={animatedStyle} />
                    </Show.Else>
                </Show>
            </View>
        </Button>
    );
};

export default TabButton;
