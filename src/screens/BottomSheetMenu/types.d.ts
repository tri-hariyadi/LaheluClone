import {RouteProp} from '@react-navigation/native';

import {ModalStackParamList} from '@navigations/ModalRoutes/types';

export type TBottomSheetMenuRoute = {
    [P in keyof RouteProp<ModalStackParamList, 'BottomSheetMenu'>]?: RouteProp<
        ModalStackParamList,
        'BottomSheetMenu'
    >[P];
};
