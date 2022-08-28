import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AdEventType, RewardedAd, RewardedAdEventType, TestIds} from 'react-native-google-mobile-ads';
import {ADS_REWARDED_ID,} from '../../utils/constants';
import {AppContext} from '../../contexts/AppContext';

const adUnitId = __DEV__ ? TestIds.REWARDED : ADS_REWARDED_ID;

let rewarded = null;
const RewardedAdCustom = (props) => {
    const {
        children,
        onPress,
        onCloseAds
    } = props;
    const {
        noAds,
        isConnectedInternet
    } = useContext(AppContext);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!noAds && isConnectedInternet) {
            if (rewarded) {
                rewarded = null;
            }
            rewarded = RewardedAd.createForAdRequest(adUnitId, {
                requestNonPersonalizedAdsOnly: true,
                // keywords: ['fashion', 'clothing'],
            });
            const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
                setLoaded(true);
            });
            const unsubscribeEarned = rewarded.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                reward => {
                    onPress();
                }
            );
            const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
                if (onCloseAds) {
                    onCloseAds();
                }
            })
            rewarded.load();
            return () => {
                unsubscribeLoaded();
                unsubscribeEarned();
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
            <View style={styles.container}>
                {children}
                <View style={styles.loadingContainer} />
            </View>
        )
    }



    return (
        <TouchableOpacity
            onPress={async () => {
                try {
                    await rewarded.show();
                } catch (e) {
                    onPress();
                }
            }}
        >
            {children}
        </TouchableOpacity>
    );
}

export default RewardedAdCustom;
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }
})
