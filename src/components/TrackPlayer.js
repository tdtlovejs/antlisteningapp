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

const listUrl = [
    'http://mirrors.standaloneinstaller.com/audio-sample/aac/in.aac',
    'http://mirrors.standaloneinstaller.com/audio-sample/ogg/out.mp3',
    'https://www.englishclub.com/efl/wp-content/uploads/2011/12/EnglishClub.com-The-Goblins-Christmas.mp3',
]

const TAB_DISC = 'disc';
const TAB_TRANSCRIPT = 'transcript';
const TAB_EXERCISE = 'exercise';

const TrackPlayer = (props) => {
    const {
        navigation,
        route,
    } = props;
    const {
        appData,
        setAppData,
    } = useContext(AppContext);
    const {
        track
    } = appData;
    const layout = useWindowDimensions();

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

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: TAB_DISC, title: TAB_DISC },
        { key: TAB_TRANSCRIPT, title: TAB_TRANSCRIPT },
        { key: TAB_EXERCISE, title: TAB_EXERCISE },
    ]);

    const renderScene = SceneMap({
        [TAB_DISC]: (props) => {
            return (
                <TabDisc {...props} trackData={trackData}/>
            )
        },
        [TAB_TRANSCRIPT]: (props) => {
            return (
                <TabTranscript {...props} trackData={trackData}/>
            )
        },
        [TAB_EXERCISE]: (props) => {
            return (
                <TabExercise {...props} trackData={trackData}/>
            )
        },
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.tabBarIndicatorStyle}
            style={styles.tabBar}
            renderIcon={({ route, focused, color }) => {
                console.log(route)
                switch (route.key) {
                    case TAB_DISC:
                        return (
                            <IonIcon
                                name={focused ? 'disc' : 'disc-outline'}
                                color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                size={24}
                            />
                        )
                    case TAB_TRANSCRIPT:
                        return (
                            <IonIcon
                                name={focused ? 'document-text' : 'document-text-outline'}
                                color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                size={24}
                            />
                        )
                    case TAB_EXERCISE:
                        return (
                            <MaterialIcon
                                name={focused ? 'head-question' : 'head-question-outline'}
                                color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                size={24}
                            />
                        )
                }
            }}
            renderLabel={({ route, focused, color }) => (
                <></>
            )}
        />
    );


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
                        <TouchableOpacity onPress={() => {
                            setIsFullScreen(false)
                        }}>
                            <IonIcon
                                name={isFullScreen ? 'chevron-down' : 'chevron-up'}
                                size={24}
                                color={COLOR_BASIC_1}
                            />
                        </TouchableOpacity>
                        <View style={styles.tabContainer}>
                            <TabView
                                renderTabBar={renderTabBar}
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={{ width: layout.width }}
                            />
                        </View>
                    </>
                    :
                    <></>
            }

            {
                (!trackData || loading) ?
                    <></>
                    :
                    <View style={styles.wrapper}>
                        <TrackPlayApp
                            trackData={trackData}
                            audioLink={listUrl[randomRange(0, listUrl.length-1)]}
                            isFullScreen={isFullScreen}
                            onFullScreenTrack={() => {
                                setIsFullScreen(true);
                            }}
                        />
                    </View>
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
        bottom: 0,
        backgroundColor: '#D0D2E1',
        height: 60
    },
    containerFullscreen: {
        top: 0,
        height: '100%'
    },
    wrapper: {
        width: '100%',
        alignItems: 'center'
    },
    tabContainer: {
        flex: 1,
        // backgroundColor: 'red',
        padding: 5,
        width: '100%',
    },
    tabBar: {
        backgroundColor: '#D0D2E1',
        shadowOpacity: 0,
        borderBottomWidth: 0,elevation:0
    },
    tabBarIndicatorStyle: {
        height: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        elevation:0
    }
});
