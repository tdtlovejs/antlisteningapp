import {StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {COLOR_BASIC_2} from '../utils/colors';
import {useTranslation} from "react-i18next";
import BannerAdCustom from "./AdsCustom/BannerAdCustom";
import {BannerAdSize} from "react-native-google-mobile-ads";

const ViewAds = (props) => {
    const {
        noAds,
    } = useContext(AppContext);
    const {t} = useTranslation();

    if (noAds) {
        return (
            <></>
        )
    }
    return (
        <>
            <Text style={styles.labelText}>
                {t('label.sponsored_by')}
            </Text>
            <BannerAdCustom size={BannerAdSize.MEDIUM_RECTANGLE}/>
        </>
    )
}

export default ViewAds;
const styles = StyleSheet.create({
    labelText: {
        padding: 5,
        color: COLOR_BASIC_2,
        fontWeight: '300',
        fontSize: 12,
        letterSpacing: 0.6,
        lineHeight: 24,
        textAlign: 'center'
    }
})
