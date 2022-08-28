import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {AppContext} from '../../contexts/AppContext';
import {ADS_BANNER_ID} from "../../utils/constants";
const listBannerAdSize = [
    BannerAdSize.BANNER,
    BannerAdSize.FULL_BANNER,
    BannerAdSize.LARGE_BANNER,
    BannerAdSize.MEDIUM_RECTANGLE,
    BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
]
const adUnitId = __DEV__ ? TestIds.BANNER : ADS_BANNER_ID;

const BannerAdCustom = (props) => {
    const {
        size
    } = props;
    const {
        noAds,
        isConnectedInternet
    } = useContext(AppContext);
    if (noAds || !isConnectedInternet) {
        return (
            <></>
        )
    }
    const bannerSize = listBannerAdSize.includes(size) ? size : BannerAdSize.ANCHORED_ADAPTIVE_BANNER;
    return (
        <View style={[
            styles.container,
            (bannerSize === BannerAdSize.BANNER ? styles.banner : {}),
            (bannerSize === BannerAdSize.FULL_BANNER ? styles.full_banner : {}),
            (bannerSize === BannerAdSize.LARGE_BANNER ? styles.large_banner : {}),
            (bannerSize === BannerAdSize.MEDIUM_RECTANGLE ? styles.medium_rectangle : {}),
            (bannerSize === BannerAdSize.ANCHORED_ADAPTIVE_BANNER ? styles.anchored_adaptive_banner : {}),
        ]}>
            <BannerAd
                unitId={adUnitId}
                size={bannerSize}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}

export default BannerAdCustom;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner: {
        height: 54,
    },
    full_banner: {
        height: 64,
    },
    large_banner: {
        height: 104,
    },
    medium_rectangle: {
        height: 254,
    },
    anchored_adaptive_banner: {
        height: 54,
        paddingVertical: 2,
    }
})
