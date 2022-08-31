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
import {importTracks, updateListenAtById} from '../databases/db';

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
    const [db, setDic] = useState(null);
    const [settings, setSettings] = useState(null);
    const [dbDone, setDbDone] = useState(null);

    const [loadingSettings, setLoadingSettings] = useState(false);
    const [loadingOpenAd, setLoadingOpenAd] = useState(true);
    const [loadingDbDone, setLoadingDbDone] = useState(false);

    const [appData, setAppData] = useState({
        playlist: [],
        track: null
    })


    useEffect(() => {
        if (!isConnectedInternet) {
            setLoadingOpenAd(true)
        }
    }, [isConnectedInternet])
    useEffect(() => {
        getSettingsFromStorage();
        getDbDoneFromStorage();
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

    const getDbDoneFromStorage = async () => {
        try {
            const result = await AsyncStorage.getItem(KEY_STORAGE_DIC_DONE);
            if (result) {
                setDbDone(result);
            }
            setLoadingDbDone(true);
        } catch (e) {
            setLoadingDbDone(true);
        }
    }
    const saveDbDoneToStorage = async (dbDone) => {
        if (dbDone) {
            await AsyncStorage.setItem(KEY_STORAGE_DIC_DONE, dbDone);
        } else {
            // await AsyncStorage.removeItem(KEY_STORAGE_DIC_DONE);
        }
    }
    useEffect(() => {
        saveDbDoneToStorage(dbDone)
    }, [dbDone])


    useEffect(() => {
        // NetInfo.addEventListener(async state => {
        //     if (!NO_ADS) {
        //         if (!state.isConnected) {
        //             setNoAds(true);
        //         } else {
        //             setNoAds(false);
        //         }
        //     }
        //     setIsConnectedInternet(state.isConnected);
        // })
    }, [])
    const addTrackToPlaylist = (idTrack) => {
        // updateListenAtById(idTrack)
        // let playlistTemp = appData.playlist.filter(item => item !== idTrack);
        // setAppData(prev => ({
        //     playlist: [
        //         ...idTrack,
        //         playlistTemp
        //     ],
        //     track: idTrack
        // }))

    }

    const onResetPlaylist = () => {
        setAppData({
            playlist: [],
            track: null
        })
    }

    const onDownloadDic = () => {
        const googleDriveDicDBId = '1TFUvr9cm3PlZDj9e99Vi8e1mZ7sMhm7X';
        const link = `https://drive.google.com/uc?export=view&id=${googleDriveDicDBId}&confirm=t`;
        const {config, fs} = RNFetchBlob;
        const path = `${RNFS.ExternalDirectoryPath}/antlistening.zip`;
        const pathDbFile = RNFS.ExternalDirectoryPath;
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
                        unZipDbFile(path, pathDbFile)
                    })
                    .catch(err => {
                    })
            } else {
                unZipDbFile(path, pathDbFile)
            }
        })
    }

    const unZipDbFile = (path, pathDbFile) => {
        unzip(path, pathDbFile)
            .then((path) => {
                openDBWords();
                RNFS.unlink(`${RNFS.ExternalDirectoryPath}/antlistening.zip`)
            })
            .catch((error) => {
                RNFS.unlink(`${RNFS.ExternalDirectoryPath}/antlistening.zip`)
            })
    }
    const openDBWords = () => {
        RNFS.copyFile(
            `${RNFS.ExternalDirectoryPath}/antlistening.db`,
            `${RNFetchBlob.fs.dirs.MainBundleDir}/databases/antlistening.sqlite3`
        )
            .then(res => {
                setDic(SQLite.openDatabase({
                        name : `antlistening.sqlite3`,
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
        if (db && loadingDbDone && dbDone !== DONE) {
            try {
                db.transaction(async (tx) => {
                    tx.executeSql(
                        `SELECT * FROM antlistening`,
                        [],
                        (tx, results) => {
                            const arr = new Array(results.rows.length).fill(0);
                            let items = arr.map((item, index) => {
                                return results.rows.item(index);
                            })
                            importTracks(items)
                                .then(res => {
                                    // RNFS.unlink(`${RNFS.ExternalDirectoryPath}/antlistening.db`)
                                    setDbDone(DONE);
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
    }, [db])

    useEffect(() => {
        onDownloadDic();
    }, [])


    const appContextData = {
        lang,
        setLang,
        db,
        setDic,
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
        onResetPlaylist,
        dbDone
    }
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
