import React, {useState} from 'react';

import {DrawerContentComponentProps, DrawerContentScrollView} from '@react-navigation/drawer';
import {TouchableOpacity, View} from 'react-native';

import {Gap, Row, Text} from '@components';
import {colors, dimens} from '@styles';

import DrawerItem from './DrawerItem';
import styles from './styles';
import {TDrawerList} from './types';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
    const [drawerList] = useState<TDrawerList>([
        {
            name: 'Home',
            ic: 'ic_home',
            navigationParams: {
                screen: 'Home',
                params: {
                    screen: 'Beranda',
                    params: {indexTab: 0},
                },
            },
        },
        {
            name: 'Fresh',
            ic: 'ic_time',
            navigationParams: {
                screen: 'Home',
                params: {
                    screen: 'Beranda',
                    params: {indexTab: 1},
                },
            },
        },
        {
            name: 'Trending',
            ic: 'ic_trend',
            navigationParams: {
                screen: 'Home',
                params: {
                    screen: 'Beranda',
                    params: {indexTab: 2},
                },
            },
        },
        {
            name: 'Topik',
            ic: 'ic_users',
            navigationParams: {
                screen: 'Home',
                params: {
                    screen: 'Users',
                    params: {indexTab: 0},
                },
            },
        },
        {
            name: 'Meme lain',
            ic: 'ic_users',
            collapsible: true,
            itemStyle: {
                borderTopWidth: 0.5,
                borderTopColor: colors.white,
            },
            subMenu: [
                {
                    name: 'Peringkat',
                    ic: 'ic_trophy',
                    navigationParams: {
                        screen: 'Peringkat',
                    },
                },
                {
                    name: 'Tersimpan',
                    ic: 'ic_frame',
                    navigationParams: {
                        screen: 'Tersimpan',
                    },
                },
                {
                    name: 'Acak',
                    ic: 'ic_shuffle',
                    navigationParams: {
                        screen: 'Acak',
                    },
                },
            ],
        },
        {
            name: 'Jelajah',
            ic: 'ic_users',
            collapsible: true,
            itemStyle: {
                borderTopWidth: 0.5,
                borderTopColor: colors.white,
            },
            subMenu: [
                {
                    name: 'Donatur',
                    ic: 'ic_donate',
                    navigationParams: {
                        screen: 'Donatur',
                    },
                },
                {
                    name: 'Medali',
                    ic: 'ic_medal',
                    navigationParams: {
                        screen: 'Medali',
                    },
                },
                {
                    name: 'Toko koin',
                    ic: 'ic_dollar',
                    navigationParams: {
                        screen: 'OtherStore',
                    },
                },
                {
                    name: 'Discord',
                    ic: 'ic_discord',
                },
            ],
        },
    ]);

    const [explore] = useState<TDrawerList>([
        {
            name: 'Lucu',
            ic: {uri: 'https://lahelu.com/media/hashtags/funny.jpg'},
        },
        {
            name: 'Relate',
            ic: {uri: 'https://lahelu.com/media/hashtags/relate.jpg'},
        },
        {
            name: 'Gaming',
            ic: {uri: 'https://lahelu.com/media/hashtags/gaming.jpg'},
        },
        {
            name: 'Nostalgia',
            ic: {uri: 'https://lahelu.com/media/hashtags/nostalgia.jpg'},
        },
        {
            name: 'Sad',
            ic: {uri: 'https://lahelu.com/media/hashtags/sad.jpg'},
        },
        {
            name: 'Random',
            ic: {uri: 'https://lahelu.com/media/hashtags/random.jpg'},
        },
        {
            name: 'Wtf',
            ic: {uri: 'https://lahelu.com/media/hashtags/wtf.jpg'},
        },
        {
            name: 'Rage',
            ic: {uri: 'https://lahelu.com/media/hashtags/rage.jpg'},
        },
        {
            name: 'Anime',
            ic: {uri: 'https://lahelu.com/media/hashtags/anime.jpg'},
        },
        {
            name: 'Sarkas',
            ic: {uri: 'https://lahelu.com/media/hashtags/sarcastic.jpg'},
        },
        {
            name: 'Dark',
            ic: {uri: 'https://lahelu.com/media/hashtags/dark.jpg'},
        },
        {
            name: 'Absurd',
            ic: {uri: 'https://lahelu.com/media/hashtags/absurd.jpg'},
        },
        {
            name: 'Cringe',
            ic: {uri: 'https://lahelu.com/media/hashtags/cringe.jpg'},
        },
        {
            name: 'Sus',
            ic: {uri: 'https://lahelu.com/media/hashtags/sus.jpg'},
        },
        {
            name: 'Binatang',
            ic: {uri: 'https://lahelu.com/media/hashtags/animal.jpg'},
        },
    ]);

    const [info] = useState(['Kontak', 'Aturan', 'Ketentuan', 'Kebijakan', 'Lahelu+', 'Koin']);

    return (
        <View style={{flex: 1, backgroundColor: colors.dark}}>
            <DrawerContentScrollView {...props}>
                {drawerList.map((value, index) => (
                    <DrawerItem key={`Drawer-Item-${index}`} {...value} />
                ))}
                <Gap height={dimens.SpaceM} />

                <Text.ExtraBold color={colors.B100} style={styles.listPadding}>
                    Telusuri
                </Text.ExtraBold>
                {explore.map((value, index) => (
                    <DrawerItem key={`Drawer-Item-${index}`} {...value} />
                ))}
                <Gap height={dimens.SpaceM} />

                <Text.ExtraBold color={colors.B100} style={styles.listPadding}>
                    Informasi
                </Text.ExtraBold>
                <Gap height={dimens.Space2XS} />

                <Row style={[styles.listPadding, styles.infoMenuContainer]}>
                    {info.map((value, index) => (
                        <TouchableOpacity key={`drawer-information-${index}`}>
                            <Text color={colors.white}>{value}</Text>
                        </TouchableOpacity>
                    ))}
                </Row>
                <Gap height={dimens.SpaceL} />
            </DrawerContentScrollView>
        </View>
    );
};

export default DrawerContent;
