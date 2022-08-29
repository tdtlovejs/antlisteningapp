import React, {useLayoutEffect} from 'react';
import {createContext, useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DONE, KEY_STORAGE_DIC_DONE,
    KEY_STORAGE_SETTINGS,
    NO_ADS, PHONETIC_AUDIO_US,
} from '../utils/constants';
import NetInfo from "@react-native-community/netinfo";
import {useTranslation} from "react-i18next";
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {unzip} from 'react-native-zip-archive';
import {importTracks} from '../databases/db';

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
    const [dicDone, setDicDone] = useState(null);

    const [loadingSettings, setLoadingSettings] = useState(false);
    const [loadingOpenAd, setLoadingOpenAd] = useState(true);
    const [loadingDicDone, setLoadingDicDone] = useState(false);

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

    const getDicDoneFromStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(KEY_STORAGE_DIC_DONE);
            if (result) {
                setDicDone(result);
            }
            setLoadingDicDone(true);
        } catch (e) {
            setLoadingDicDone(true);
        }
    }
    const saveDicDoneToStorage = async (dicDone) => {
        if (dicDone) {
            await AsyncStorage.setItem(KEY_STORAGE_DIC_DONE, dicDone);
        } else {
            await AsyncStorage.removeItem(KEY_STORAGE_DIC_DONE);
        }
    }
    useEffect(() => {
        saveDicDoneToStorage(dicDone)
    }, [dicDone])


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

    const onResetPlaylist = () => {
        setAppData({
            playlist: [],
            track: null
        })
    }

    const onDownloadDic = (langCode) => {
        const googleDriveDicDBId = WORDS_ID[langCode];
        const link = `https://drive.google.com/uc?export=view&id=${googleDriveDicDBId}&confirm=t`;
        const {config, fs} = RNFetchBlob;
        const path = `${RNFS.ExternalDirectoryPath}/antvoca/words/${langCode}.zip`;
        const pathDbFile = RNFS.ExternalDirectoryPath + `/antvoca/words`;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: false,
                path: path,
                description: 'Downloading'
            }
        }
        fs.exists(path).then(async isExist => {
            if (!isExist) {
                config(options)
                    .fetch('POST', link)
                    .then(async (res) => {
                        unZipDbFile(path, pathDbFile, langCode)
                    })
                    .catch(err => {
                    })
            } else {
                unZipDbFile(path, pathDbFile, langCode)
            }
        })
    }

    const unZipDbFile = (path, pathDbFile, langCode) => {
        unzip(path, pathDbFile)
            .then((path) => {
                openDBWords(langCode);
                RNFS.unlink(`${RNFS.ExternalDirectoryPath}/antenglish/db.zip`)
            })
            .catch((error) => {
                RNFS.unlink(`${RNFS.ExternalDirectoryPath}/antenglish/db.zip`)
            })
    }
    const openDBWords = (langCode) => {
        RNFS.copyFile(
            `${RNFS.ExternalDirectoryPath}/antvoca/words/${langCode}.db`,
            `${RNFetchBlob.fs.dirs.MainBundleDir}/databases/${langCode}.sqlite3`
        )
            .then(res => {
                setDic(SQLite.openDatabase({
                        name : `${langCode}.sqlite3`,
                        createFromLocation : 1,
                        readOnly: true,
                    },
                    (res => {
                        console.log('res ',res)

                    }),
                    (err =>{
                        console.log('err ',err)
                    })))
            })
            .catch(err => {

            })
    }

    useEffect(() => {
        if (lang && dbDic && loadingDicDone && dicDone !== DONE) {
            try {
                dbDic.transaction(async (tx) => {
                    tx.executeSql(
                        `SELECT * FROM words`,
                        [],
                        (tx, results) => {
                            const arr = new Array(results.rows.length).fill(0);
                            let items = arr.map((item, index) => {
                                return results.rows.item(index);
                            })
                            console.log('items ',items.length)
                            importTracks(items)
                                .then(res => {
                                    RNFS.unlink(`${RNFS.ExternalDirectoryPath}/antvoca/words/${lang.code}.db`)
                                    setLoadingInitial(false);
                                    setDicDone(DONE);
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        },
                        err => {
                            console.log(err);
                        }
                    )
                })
            } catch (e) {
                console.log(e);
            }
        } else {
        }
    }, [dbDic])


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
        addTrackToPlaylist,
        onResetPlaylist
    }
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
