import React, {useState} from 'react';

import {View} from 'react-native';

import {Button, Gap, Icon, Row, Text} from '@components';
import {colors, dimens} from '@styles';

import styles from './styles';
import {TListMenu} from './types';

const AddMenu = () => {
    const [menus] = useState<Array<TListMenu>>([
        {
            name: 'Buat meme',
            ic: 'ic_picture_frame',
        },
        {
            name: 'Buat topik',
            ic: 'ic_users',
        },
        {
            name: 'Meme generator',
            ic: 'ic_meme_generator',
        },
    ]);

    return (
        <View style={styles.container}>
            {menus.map((menu, index) => (
                <Button isRowBlock background="transparent" key={`list-menu-add-${index}`} style={styles.itemContainer}>
                    <Row itemsCenter style={styles.item}>
                        <Icon name={menu.ic} size={20} color={colors.white} />
                        <Gap width={dimens.SpaceS} />
                        <Text.SemiBold color={colors.white}>{menu.name}</Text.SemiBold>
                    </Row>
                </Button>
            ))}
        </View>
    );
};

export default AddMenu;
