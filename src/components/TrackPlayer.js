import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {getDataByQueryAndPaginate, getTest, getTrackById} from '../databases/db';
import {useTranslation} from 'react-i18next';
import _, {debounce} from 'lodash';
import Input from '../themes/Input';
import {isCloseToBottom} from '../utils/functions';
import Loading from '../themes/Loading';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY} from '../utils/colors';
import {AppContext} from '../contexts/AppContext';
import AudioPlayer from '../themes/AudioPlayer';
import TrackPlayApp from './TrackPlayer/TrackPlayApp';
import {IMAGE_RANDOM_BY_INDEX, randomRange} from '../utils/constants';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
const pageSize = 10;
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import TabTranscript from './TrackPlayer/TabTranscript';
import TabDisc from './TrackPlayer/TabDisc';
import TabExercise from './TrackPlayer/TabExercise';
import TabContainer from './TrackPlayer/TabContainer';

const listUrl = [
    'http://mirrors.standaloneinstaller.com/audio-sample/aac/in.aac',
    'http://mirrors.standaloneinstaller.com/audio-sample/ogg/out.mp3',
    'https://www.englishclub.com/efl/wp-content/uploads/2011/12/EnglishClub.com-The-Goblins-Christmas.mp3',
]


const TrackPlayer = (props) => {
    const {
        navigation,
        route,
    } = props;
    const {
        appData,
        setAppData,
        onResetPlaylist
    } = useContext(AppContext);
    const {
        track
    } = appData;

    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    useEffect(() => {
        if (track) {
            setLoading(true)
            getTrackById(track)
                .then(res => {
                    setLoading(false)
                    setTrackData({
                        ...res,
                        image: IMAGE_RANDOM_BY_INDEX(Math.floor(Math.random() * 100))
                    });
                })
        }
    }, [track])



    const [role, setRole] = useState(null);

    useEffect(() => {
        if (trackData) {
            let roleA = Math.ceil((Math.random() * 20));
            let roleB = null;
            let index = 0;
            do {
                roleB = Math.ceil((Math.random() * 20));
                index += 1;
                if (index === 20) {
                    break;
                }
            } while (roleA === roleB)
            if (index === 20) {
                setRole({
                    roleA: 1,
                    roleB: 2
                })
            } else {
                setRole({
                    roleA: roleA,
                    roleB: roleB
                })
            }
        }
    }, [trackData]);



    return (
        <View
            style={[
                styles.container,
                (isFullScreen ? styles.containerFullscreen : {})
            ]}
            onPress={() => {
                if (!isFullScreen) {
                    setIsFullScreen(true)
                }
            }}
        >

            {
                isFullScreen
                ?
                    <>

                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => {
                                setIsFullScreen(false)
                            }}>
                                <IonIcon
                                    name={'chevron-down'}
                                    size={24}
                                    color={COLOR_BASIC_2}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                onResetPlaylist();
                            }}>
                                <IonIcon
                                    name={'close'}
                                    size={24}
                                    color={COLOR_BASIC_2}
                                />
                            </TouchableOpacity>
                        </View>
                        <TabContainer
                            trackData={trackData}
                            role={role}
                        />
                    </>
                    :
                    <></>
            }

            {
                (!trackData || loading) ?
                    <></>
                    :
                    <TrackPlayApp
                        trackData={trackData}
                        audioLink={listUrl[randomRange(0, listUrl.length-1)]}
                        isFullScreen={isFullScreen}
                        onFullScreenTrack={() => {
                            setIsFullScreen(true);
                        }}
                    />
            }
        </View>
    );
};

export default TrackPlayer;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#D0D2E1',
        height: 60
    },
    containerFullscreen: {
        top: 0,
        height: '100%'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

});
