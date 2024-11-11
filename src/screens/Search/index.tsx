import React from 'react';

import {TextInput, View} from 'react-native';

import {Button, Gap, Icon, Row, Text} from '@components';
import {navigationRef} from '@navigations/index';
import {colors, dimens} from '@styles';

import styles from './styles';

const Search = () => {
    return (
        <View style={styles.container}>
            <Row itemsCenter justifyBetween style={styles.header}>
                <Text.Bold color={colors.white} size={dimens.FontM}>
                    Cari meme
                </Text.Bold>
                <Button
                    background="transparent"
                    style={styles.btnClose}
                    onPress={() => navigationRef.current?.goBack()}>
                    <Icon name="ic_close" size={dimens.FontXL} color={colors.white} />
                </Button>
            </Row>
            <Gap height={dimens.SpaceM} />
            <View style={styles.textInput}>
                <TextInput placeholder="Tulis judul, username, atau tag..." placeholderTextColor="silver" />
            </View>
        </View>
    );
};

export default Search;
