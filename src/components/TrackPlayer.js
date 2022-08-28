import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {getDataByQueryAndPaginate, getTest, getTrackById} from '../databases/db';
import {useTranslation} from 'react-i18next';
import _, {debounce} from 'lodash';
import Input from '../themes/Input';
import {isCloseToBottom} from '../utils/functions';
import Loading from '../themes/Loading';
import {COLOR_BASIC_1, COLOR_BASIC_2_OPACITY} from '../utils/colors';
import {AppContext} from '../contexts/AppContext';
import AudioPlayer from '../themes/AudioPlayer';
import TrackPlayApp from './TrackPlayer/TrackPlayApp';
import {randomRange} from '../utils/constants';
import {SceneMap, TabView} from 'react-native-tab-view';
const pageSize = 10;
import IonIcon from 'react-native-vector-icons/Ionicons';
import TabTranscript from './TrackPlayer/TabTranscript';

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
                    setTrackData(res);
                })
        }
    }, [track])

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'transcript' },
        { key: 'third', title: 'third' },
    ]);
    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );

    const transcriptRoute = (props) => (
        <TabTranscript {...props} trackData={trackData}/>
    );
    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'green' }} />
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: transcriptRoute,
        third: ThirdRoute
    });
    return (
        <View style={[
            styles.container,
            (isFullScreen ? styles.containerFullscreen : {})
        ]}>

            <TouchableOpacity onPress={() => {
                // navigation.navigate('track')
                setIsFullScreen(prev => !prev)
            }}>
                <IonIcon
                    name={isFullScreen ? 'chevron-down' : 'chevron-up'}
                    size={24}
                    color={COLOR_BASIC_1}
                />
            </TouchableOpacity>
            <Text>
                {trackData.name}
            </Text>
            {isFullScreen ? <View style={styles.tabContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View> : <></>}
            {
                (!trackData || loading) ?
                    <></>
                    :
                    <View style={styles.wrapper}>
                        <TrackPlayApp
                            audioLink={listUrl[randomRange(0, listUrl.length-1)]}

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
        backgroundColor: 'lightblue',
        height: 120
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
        backgroundColor: 'red',
        padding: 5,
        width: '100%',
    }
});
