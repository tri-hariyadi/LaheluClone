import React, {useState} from 'react';

import {SectionList, View} from 'react-native';

import {Button, Gap, Icon, Row, Text} from '@components';
import {TextProps} from '@components/types';
import {colors, dimens} from '@styles';

import styles from './styles';
import {TNestedListMenu} from './types';

const ProfileMenu = () => {
    const [menus] = useState<TNestedListMenu>([
        {
            data: [
                {
                    name: '0 koin',
                    ic: 'ic_dollar',
                    textStyle: {color: colors.Y400, fontWeight: 'bold'},
                },
                {
                    name: 'trihariyadi244820',
                    ic: 'ic_users',
                    textStyle: {fontWeight: 'bold'},
                },
                {
                    name: 'Lahelu Plus',
                    ic: 'ic_lahelu_plus',
                },
            ],
        },
        {
            data: [
                {
                    name: 'Tersimpan',
                    ic: 'ic_picture_frame',
                },
                {
                    name: 'Koin gratis',
                    ic: 'ic_free_coin',
                    textStyle: {color: colors.B100},
                },
                {
                    name: 'Logout',
                    ic: 'ic_logout',
                    textStyle: {color: colors.R400},
                },
            ],
        },
        {
            data: [
                {
                    name: 'Download aplikasi',
                    ic: 'ic_play_store',
                },
                {
                    name: 'Pengaturan',
                    ic: 'ic_setting',
                },
                {
                    name: 'Hubungi Kami',
                    ic: 'ic_message',
                },
            ],
        },
    ]);

    return (
        <View style={styles.container}>
            <SectionList
                sections={menus}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({item}) => (
                    <Button isRowBlock background="transparent" style={styles.itemContainer}>
                        <Row itemsCenter style={styles.item}>
                            <Icon name={item.ic} size={20} color={item.textStyle?.color ?? colors.white} />
                            <Gap width={dimens.SpaceS} />
                            <Text
                                font={
                                    item.textStyle?.fontWeight
                                        ? (item.textStyle?.fontWeight as TextProps['font'])
                                        : 'semi-bold'
                                }
                                color={item.textStyle?.color ?? colors.white}>
                                {item.name}
                            </Text>
                        </Row>
                    </Button>
                )}
                renderSectionHeader={({section: {data}}) => {
                    if (data.findIndex(v => v === menus[0].data[0]) > -1) return null;
                    return <View style={{borderTopWidth: 0.5, borderTopColor: colors.white}} />;
                }}
            />
        </View>
    );
};

export default ProfileMenu;
