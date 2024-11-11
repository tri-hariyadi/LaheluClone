import React from 'react';

import {View} from 'react-native';

import {Button, Gap, Icon, Row, Text} from '@components';
import {navigationRef} from '@navigations/index';
import {colors, dimens} from '@styles';

import styles from './styles';

const Notification = () => {
    return (
        <View style={styles.container}>
            <Row itemsCenter justifyBetween style={styles.header}>
                <Text.Bold color={colors.white} size={dimens.FontM}>
                    Notifikasi
                </Text.Bold>
                <Button
                    background="transparent"
                    style={styles.btnClose}
                    onPress={() => navigationRef.current?.goBack()}>
                    <Icon name="ic_close" size={dimens.FontXL} color={colors.white} />
                </Button>
            </Row>
            <Gap height={dimens.SpaceM} />
            <View style={styles.contentWrapper}>
                <Button isRowBlock background={colors.N300} style={styles.btnNotif}>
                    <Text.Bold size={dimens.FontM} color={colors.white}>
                        Semua
                    </Text.Bold>
                </Button>
                <Gap height={dimens.SpaceM} />
                <Text color={colors.ColorFill3} style={styles.text}>
                    notifikasi akan bertahan selama 6 bulan
                </Text>
            </View>
        </View>
    );
};

export default Notification;
