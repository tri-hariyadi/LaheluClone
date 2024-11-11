import useAnimatedHeader from '@utils/hooks/useAnimatedHeader';

export type FreshMenuProps = {
    header: ReturnType<typeof useAnimatedHeader>;
    tabIndex: number;
};
