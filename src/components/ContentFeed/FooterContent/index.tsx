import React from 'react';

import {ScrollView, View} from 'react-native';

import {Button, Icon, Row, Text} from '@components';
import {colors, dimens} from '@styles';

import {ContentFeedProps} from '../types';
import styles from './styles';

const FooterContent: React.FC<ContentFeedProps['data'][number]> = ({hashTag, likes, commentar}) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Row itemsCenter style={styles.btnTagWrapper}>
                    <Button background={colors.O400} style={styles.btnTag}>
                        <Row itemsCenter style={styles.row}>
                            <Icon name="ic_dollar_filled" size={dimens.FontM} color={colors.white} />
                            <Text.Bold size={dimens.FontS} color={colors.white} lineHeight={dimens.FontM + 1}>
                                Sawer
                            </Text.Bold>
                        </Row>
                    </Button>
                    {hashTag.map((value, idx) => (
                        <Button key={`hash-tag-${idx}`} isOutlineButton background={colors.N300} style={styles.btnTag}>
                            <Row itemsCenter style={styles.row}>
                                <Icon name="ic_hashtag" size={dimens.FontM} color={colors.white} />
                                <Text.Bold size={dimens.FontS} color={colors.white} lineHeight={dimens.FontM + 1}>
                                    {value}
                                </Text.Bold>
                            </Row>
                        </Button>
                    ))}
                </Row>
            </ScrollView>

            <Row itemsCenter>
                <Row style={styles.btnActionWrapper}>
                    <Row>
                        <Button background="transparent" style={[styles.btnAction, styles.btnLike]}>
                            <Row itemsCenter style={styles.row}>
                                <Icon name="ic_arrow_outline_up" size={dimens.FontM} color={colors.white} />
                                <Text.Bold color={colors.white} size={dimens.FontM}>
                                    {likes}
                                </Text.Bold>
                            </Row>
                        </Button>
                        <Button background="transparent" style={[styles.btnAction, styles.btnDissLike]}>
                            <Icon name="ic_arrow_outline_up" size={dimens.FontM} color={colors.white} />
                        </Button>
                    </Row>
                    <Button isOutlineButton background={colors.N300} style={styles.btnAction}>
                        <Row itemsCenter style={styles.row}>
                            <Icon name="ic_comment" size={dimens.FontM} color={colors.white} />
                            <Text.Bold color={colors.white} size={dimens.FontM} lineHeight={dimens.FontL}>
                                {commentar}
                            </Text.Bold>
                        </Row>
                    </Button>
                </Row>
                <Button isOutlineButton background={colors.N300} style={styles.btnAction}>
                    <Row itemsCenter style={styles.row}>
                        <Icon name="ic_forward" size={dimens.FontM} color={colors.white} />
                    </Row>
                </Button>
            </Row>
        </View>
    );
};

export default FooterContent;
