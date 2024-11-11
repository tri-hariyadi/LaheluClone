import React, {useCallback, useEffect, useState} from 'react';

import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {type NativeScrollEvent, type NativeSyntheticEvent, TouchableOpacity, View} from 'react-native';

import {ContentFeed, Gap, LoaderInfiniteScroll, Row, Text} from '@components';
import {colors, dimens} from '@styles';
import Helpers from '@utils/Helpers';
import {fetchMorePost, fetchPost} from '@utils/services/home';
import {Post} from 'types/post';

import styles from './styles';
import type {HomeMenuProps} from './types';

const HomeMenu: React.FC<HomeMenuProps> = ({header, tabIndex}) => {
    const [post, setPost] = useState<Array<Post.PostContent>>([]);
    const [limit] = useState(5);
    const [startAfter, setStartAfter] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<Post.PostContent>>();
    const [lastPost, setLastPost] = useState(false);

    const fetchdata = async () => {
        const postData = await fetchPost(limit);
        setPost(prev => [...prev, ...postData.post]);
        setStartAfter(postData.lastVisible);
    };

    const fetchMoreData = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (lastPost) return;
        if (post.length && Helpers.isCloseToBottom(event)) {
            const postData = await fetchMorePost(limit, startAfter);
            setPost(prev => [...prev, ...postData.post]);
            setStartAfter(postData.lastVisible);
            setLastPost(() => postData.post.length === 0);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const _listFooterComponent = useCallback(() => <LoaderInfiniteScroll isLast={lastPost} />, [lastPost]);
    const _listHeaderComponent = useCallback(
        () => (
            <TouchableOpacity activeOpacity={0.7} style={styles.msgContainer}>
                <Row itemsCenter>
                    <Text>🎉</Text>
                    <Gap width={dimens.SpaceM} />
                    <Text.Bold textWrap color={colors.white}>
                        Mari merapat! Klik untuk join giveaway kemerdekaan!
                    </Text.Bold>
                </Row>
            </TouchableOpacity>
        ),
        [lastPost],
    );

    return (
        <View style={{flex: 1}}>
            <ContentFeed
                data={post}
                header={header}
                isPlay={tabIndex === 0}
                onMomentumScrollEnd={fetchMoreData}
                ListFooterComponent={_listFooterComponent}
                ListHeaderComponent={_listHeaderComponent}
            />
        </View>
    );
};

export default React.memo(HomeMenu);
