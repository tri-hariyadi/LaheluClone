import React, {useCallback, useEffect, useState} from 'react';

import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {type NativeScrollEvent, type NativeSyntheticEvent, View} from 'react-native';

import {ContentFeed, LoaderInfiniteScroll} from '@components';
import Helpers from '@utils/Helpers';
import {fetchMorePost, fetchPost} from '@utils/services/home';
import type {Post} from 'types/post';

import type {FreshMenuProps} from './types';

const Fresh: React.FC<FreshMenuProps> = ({header, tabIndex}) => {
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

    return (
        <View style={{flex: 1}}>
            <ContentFeed
                data={post}
                header={header}
                isPlay={tabIndex === 1}
                onMomentumScrollEnd={fetchMoreData}
                ListFooterComponent={_listFooterComponent}
            />
        </View>
    );
};

export default Fresh;
