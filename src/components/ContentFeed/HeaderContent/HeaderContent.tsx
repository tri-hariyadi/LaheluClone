import React from 'react';

import {View} from 'react-native';

import {colors, dimens} from '@styles';
import Helpers from '@utils/Helpers';
import type {Post} from 'types/post';

import styles from './styles';
import Button from '../../Button';
import Icon from '../../Icon';
import ProgressiveImage from '../../ProgressiveImage';
import Row from '../../Row';
import Text from '../../Text';

const HeaderContent: React.FC<Post.PostContent> = ({avatarUri, username, caption, createdAt}) => {
    return (
        <View style={styles.container}>
            <Row itemsCenter justifyBetween>
                <Row itemsCenter style={styles.profile}>
                    <ProgressiveImage source={{uri: avatarUri}} style={styles.imgProfile} />
                    <Row itemsCenter>
                        <Text.Bold color={colors.white} size={dimens.FontXS}>
                            {username}
                            {' . '}
                            <Text.SemiBold color="silver" size={dimens.FontXS}>
                                {Helpers.formatCreatedAt(createdAt)}
                            </Text.SemiBold>
                        </Text.Bold>
                    </Row>
                </Row>
                <Button background="transparent" style={styles.dotButton}>
                    <Icon name="ic_dotthree" size={dimens.FontL} color={colors.white} />
                </Button>
            </Row>
            <Text.Bold color={colors.white} size={dimens.FontM}>
                {caption}
            </Text.Bold>
        </View>
    );
};

export default HeaderContent;
