import firestore, {type FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {Post} from 'types/post';

export const fetchPost = async (limit: number) => {
    const post: Array<Post.PostContent> = [];
    const querySnapshot = await firestore().collection<Post.PostContent>('feed').limit(limit).get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    querySnapshot.forEach(doc => post.push(doc.data()));
    return {post, lastVisible};
};

export const fetchMorePost = async (
    limit: number,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<Post.PostContent> | undefined,
) => {
    const post: Array<Post.PostContent> = [];
    const queryRef = firestore().collection<Post.PostContent>('feed').limit(limit);
    const querySnapshot = await (startAfter ? queryRef.startAfter(startAfter) : queryRef).get();
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    querySnapshot.forEach(doc => post.push(doc.data()));
    return {post, lastVisible};
};
