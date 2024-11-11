import useAnimatedHeader from '@utils/hooks/useAnimatedHeader';

export type HomeMenuProps = {
    header: ReturnType<typeof useAnimatedHeader>;
    tabIndex: number;
};
