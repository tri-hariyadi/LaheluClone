export declare module Post {
    export interface PostContent {
        id: number;
        avatarUri: string;
        username: string;
        contentType: 'image' | 'video';
        imageUri: string;
        videoUri: string;
        hashTag: Array<string>;
        caption: string;
        likes: number;
        commentar: number;
        createdAt: string;
    }
}
