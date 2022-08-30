import { AppOpenAd, TestIds, AdEventType, useAppOpenAd } from 'react-native-google-mobile-ads';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../contexts/AppContext';

const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ADS_OPEN_ID';


const OpenAdCustom = (props) => {
    const {
        loadingOpenAd,
        setLoadingOpenAd,
        isConnectedInternet
    } = useContext(AppContext);
    const { isLoaded, isClosed, load, show } = useAppOpenAd(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });
    useEffect(() => {
        if (isLoaded) {
            try {
                show();
            } catch (e) {
                console.log(e)
                setLoadingOpenAd(true)
            }
        }
    }, [isLoaded])

    useEffect(() => {
        setTimeout(() => {
            if (!loadingOpenAd) {
                setLoadingOpenAd(true);
            }
        }, 30000)
    }, [])
    useEffect(() => {
        try {
            load();
        } catch (e) {
            console.log(e)
            setLoadingOpenAd(true)
        }
    }, [load]);

    useEffect(() => {
        if (isClosed) {
            setLoadingOpenAd(true);
        }
    }, [isClosed]);
}

export default OpenAdCustom;
