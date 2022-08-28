import React, {useContext, useEffect, useState} from 'react';
import {Button, TouchableOpacity} from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import {AppContext} from '../../contexts/AppContext';
import {ADS_INTERSTITIAL_ID} from "../../utils/constants";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : ADS_INTERSTITIAL_ID;

let interstitial = null;
const InterstitialAdCustom = (props) => {
    const {
        children,
        onPress
    } = props;
    const {
        noAds,
        isConnectedInternet
    } = useContext(AppContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!noAds && isConnectedInternet) {
            if (interstitial) {
                interstitial = null;
            }
            interstitial = InterstitialAd.createForAdRequest(adUnitId, {
                requestNonPersonalizedAdsOnly: true,
            });

            const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, (payload) => {
                setLoaded(true);
            });
            const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, (payload) => {
                onPress()
            })
            interstitial.load();
            return () => {
                unsubscribeLoaded();
                unsubscribeClosed();
            };
        }

        // setTimeout(() => {
        //     if (!loaded) {
        //         setLoaded(true)
        //     }
        // }, 10000)

    }, [isConnectedInternet]);

    if (noAds) {
        return (
            <TouchableOpacity
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }

    if (!loaded) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <TouchableOpacity
            onPress={async () => {
                try {
                    await interstitial.show()
                } catch (e) {
                    onPress()
                }
            }}
        >
            {children}
        </TouchableOpacity>
    );
}

export default InterstitialAdCustom;
