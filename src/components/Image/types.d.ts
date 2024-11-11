import type {ImageProps} from 'react-native';

import * as Images from '@images/index';

export type ImageInternalSource = {
    name: keyof typeof Images;
    source?: undefined;
};

type ImageExternalSource = {
    source: ImageProps['source'];
    name?: undefined;
};

export type ImageComponentProps = {
    size?: number;
    borderRadius?: number;
} & Omit<ImageProps, 'source'> &
    (ImageInternalSource | ImageExternalSource);
