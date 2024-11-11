import type {FlashListProps} from '@shopify/flash-list';
import type {ViewToken} from 'react-native';

import useAnimatedHeader from '@utils/hooks/useAnimatedHeader';
import type {Post} from 'types/post';

export type ContentFeedProps<F> = {
    data: Array<Post.PostContent>;
    header: ReturnType<typeof useAnimatedHeader>;
    isPlay?: boolean;
} & Omit<FlashListProps<F>, 'renderItem' | 'keyExtractor' | 'onScroll' | 'onViewableItemsChanged'>;

interface OnItemViewableItemsChangedType {
    viewableItems: ViewToken<ContentFeedProps['data'][number]>[];
    changed: ViewToken[];
}

export type VideoPlayerProps = {
    isPlaying: boolean;
    playingVideo: number;
    videoUri: string;
    index: number;
    isMuted: boolean;
    handleMuteToggle: () => void;
};

export type VideoPlayerRefObject = {
    pause: () => void;
    resume: () => void;
    mute: () => void;
};
