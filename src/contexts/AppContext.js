import React, {useLayoutEffect} from 'react';
import {createContext, useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    KEY_STORAGE_SETTINGS,
    NO_ADS, PHONETIC_AUDIO_US,
} from '../utils/constants';
import NetInfo from "@react-native-community/netinfo";
import {useTranslation} from "react-i18next";


export const AppContext = createContext({});

const settingsInitial = {
    phoneticAudio: PHONETIC_AUDIO_US,
    isSoundCheckQues: true,
    isSoundBackground: true,
    isNotiRemind: true,
    isDailyTime: true,
    dailyTime: {
        hour: 9,
        minute: 0
    }
};
const AppContextProvider = ({children}) => {
    const {t} = useTranslation();

    const [lang, setLang] = useState(null);
    const [isConnectedInternet, setIsConnectedInternet] = useState(true);
    const [noAds, setNoAds] = useState(NO_ADS);
    const [dbDic, setDic] = useState(null);
    const [settings, setSettings] = useState(null);


    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(false);
    const [loadingOpenAd, setLoadingOpenAd] = useState(true);

    const [appData, setAppData] = useState({
        playlist: [],
        track: null
    })
    // const [playlist, setPlaylist] = useState([]);
    // const [track, setTrack] = useState(null);


    useEffect(() => {
        if (!isConnectedInternet) {
            setLoadingOpenAd(true)
        }
    }, [isConnectedInternet])
    useEffect(() => {
        getSettingsFromStorage();
    }, [])
    const getSettingsFromStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(KEY_STORAGE_SETTINGS);
            if (result) {
                setSettings(JSON.parse(result));
            } else {
                setSettings({...settingsInitial});
            }
            setLoadingSettings(true);
        } catch (e) {
            setLoadingSettings(true);
            setSettings({...settingsInitial});
        }
    }
    const saveSettingsToStorage = async (settings) => {
        if (settings) {
            await AsyncStorage.setItem(KEY_STORAGE_SETTINGS, JSON.stringify(settings));
        } else {
            await AsyncStorage.removeItem(KEY_STORAGE_SETTINGS);
        }
    }
    useEffect(() => {
        saveSettingsToStorage(settings)
    }, [settings])


    useEffect(() => {
        NetInfo.addEventListener(async state => {
            if (!NO_ADS) {
                if (!state.isConnected) {
                    setNoAds(true);
                } else {
                    setNoAds(false);
                }
            }
            setIsConnectedInternet(state.isConnected);
        })
    }, [])
    const addTrackToPlaylist = (idTrack) => {
        let playlistTemp = appData.playlist.filter(item => item !== idTrack);
        setAppData(prev => ({
            playlist: [
                ...idTrack,
                playlistTemp
            ],
            track: idTrack
        }))

    }
    const appContextData = {
        lang,
        setLang,
        dbDic,
        setDic,
        loadingInitial,
        setLoadingInitial,
        noAds,
        isConnectedInternet,
        setIsConnectedInternet,
        settings,
        setSettings,
        loadingSettings,
        loadingOpenAd,
        setLoadingOpenAd,
        appData,
        setAppData,
        addTrackToPlaylist
    }
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;