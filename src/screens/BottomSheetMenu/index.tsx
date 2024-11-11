import React, {useEffect, useRef} from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {BottomSheet, Button, Icon, Row, Show, Text} from '@components';
import {AppStackParamList} from '@navigations/types';
import {AddMenu, ProfileMenu} from '@parts/ListMenuBottomSheet';
import {colors, dimens} from '@styles';
import {BottomSheetRefObject} from 'src/components/BottomSheet/types';

import styles from './styles';
import {TBottomSheetMenuRoute} from './types';

const BottomSheetMenu: React.FC<{route?: TBottomSheetMenuRoute}> = ({route}) => {
    const {params} = route || {};
    const btSheetRef = useRef<BottomSheetRefObject>(null);
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    useEffect(() => {
        btSheetRef.current?.show();
    }, [route]);

    const onDismiss = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const close = () => btSheetRef.current?.dismiss();

    return (
        <BottomSheet btSheetRef={btSheetRef} containerStyle={styles.btSheetContainer} onDismiss={onDismiss}>
            <Row itemsCenter style={styles.header}>
                <Text.Bold textWrap color={colors.white} size={dimens.FontL}>
                    Pilihan
                </Text.Bold>
                <Button background="transparent" style={styles.closeBtn} onPress={close}>
                    <Icon name="ic_close" size={22} color={colors.white} />
                </Button>
            </Row>
            <Show>
                <Show.When isTrue={params?.type === 'Add'}>
                    <AddMenu />
                </Show.When>
                <Show.Else>
                    <ProfileMenu />
                </Show.Else>
            </Show>
        </BottomSheet>
    );
};

export default BottomSheetMenu;
