import useAnimatedHeader from '@utils/hooks/useAnimatedHeader';

export type TrendingMenuProps = {
    header: ReturnType<typeof useAnimatedHeader>;
    tabIndex: number;
};
