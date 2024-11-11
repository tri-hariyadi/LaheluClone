import React, {useCallback, useRef, useState} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {FlashList, type FlashListProps} from '@shopify/flash-list';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

import {useUpdateEffect} from '@utils/hooks';
import type {Post} from 'types/post';

import Show from '../Show';
import FooterContent from './FooterContent';
import HeaderContent from './HeaderContent/HeaderContent';
import ImageComponent from './ImageComponent';
import styles from './styles';
import type {ContentFeedProps, OnItemViewableItemsChangedType, VideoPlayerRefObject} from './types';
import VideoPlayer from './VideoPlayer';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<Post.PostContent>);

const ContentFeed = <F,>({
    data,
    header,
    isPlay = true,
    onMomentumScrollEnd,
    ListFooterComponent,
    ListHeaderComponent,
}: ContentFeedProps<F>) => {
    const videoRefs = useRef<Array<VideoPlayerRefObject>>([]);
    const [playingVideo, setPlayingVideo] = useState<number>(0);

    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const flatList = useRef<FlashList<Post.PostContent>>(null);

    useUpdateEffect(() => {
        setPlayingVideo(0);
        flatList.current?.scrollToOffset({offset: 0, animated: false});
    }, [isPlay]);

    useFocusEffect(
        useCallback(() => {
            videoRefs.current?.[playingVideo]?.resume();

            return () => {
                videoRefs.current?.[playingVideo]?.pause();
            };
        }, [playingVideo]),
    );

    const handleMuteToggle = () => {
        setIsMuted(prev => !prev);
    };

    const handleViewableItemsChanged = ({viewableItems}: OnItemViewableItemsChangedType) => {
        const minMax = viewableItems.reduce(
            (acc, value) => {
                if (value.index != null) {
                    if (value.index < acc.min) {
                        acc.min = value.index;
                    }
                    if (value.index > acc.max) {
                        acc.max = value.index;
                    }
                }
                return acc;
            },
            {min: Number.MAX_VALUE, max: 0},
        );
        viewableItems.forEach(({item}) => {
            if (item.contentType === 'video') {
                if (playingVideo !== minMax.max) {
                    // Pause the previous video
                    videoRefs.current?.[minMax.max]?.pause();
                }
                // Play the new video if it comes into view
                setPlayingVideo(minMax.max);
                setIsPlaying(true);
                videoRefs.current?.[minMax.max]?.resume();
            } else {
                videoRefs.current?.[playingVideo]?.pause();
            }
        });
    };

    const renderItem: FlashListProps<Post.PostContent>['renderItem'] = ({item, index}) => {
        return (
            <>
                <HeaderContent {...item} />
                <View>
                    <Show>
                        <Show.When isTrue={item.contentType === 'image'}>
                            <ImageComponent imageUri={item.imageUri} />
                        </Show.When>
                        <Show.Else>
                            <VideoPlayer
                                ref={ref => (videoRefs.current[index] = ref as VideoPlayerRefObject)}
                                index={index}
                                isPlaying={isPlaying && isPlay}
                                videoUri={item.videoUri}
                                playingVideo={playingVideo}
                                isMuted={isMuted}
                                handleMuteToggle={handleMuteToggle}
                            />
                        </Show.Else>
                    </Show>
                </View>
                <FooterContent {...item} />
            </>
        );
    };

    const _itemSeparatorComponent = useCallback(() => <View style={styles.separator} />, []);

    return (
        <AnimatedFlashList
            ref={flatList}
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{paddingTop: header.headerHeight}}
            keyExtractor={(item, _index) => item.id.toString()}
            onScroll={header.scrollHandler}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            ItemSeparatorComponent={_itemSeparatorComponent}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            scrollEventThrottle={16}
            onMomentumScrollEnd={onMomentumScrollEnd}
            estimatedItemSize={200}
            extraData={isMuted}
        />
    );
};

export default React.memo(ContentFeed);
