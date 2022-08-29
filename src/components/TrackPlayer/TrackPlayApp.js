import React, {useContext, useEffect, useState} from 'react';
import {Text, Button, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {
    usePlaybackState,
    State,
    Event
} from 'react-native-track-player';
import {
    useProgress,
    useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import {IMAGE_RANDOM_BY_INDEX, WINDOW_WIDTH} from '../../utils/constants';
import {toHHMMSS} from '../../utils/functions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_WHITE} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import {getRandomTrackId} from '../../databases/db';
// import styles from './styles';

const songDetails = {
    id: '1',
    url:
        'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    title: 'The Greatest Song',
    album: 'Great Album',
    artist: 'A Great Dude',
    artwork: 'https://picsum.photos/300',
};


const TrackPlayApp = (props) => {
    const {
        audioLink,
        isFullScreen,
        trackData,
        onFullScreenTrack
    } = props;
    const {
        addTrackToPlaylist,
        onResetPlaylist
    } = useContext(AppContext);
    useEffect(() => {
        return () => {
            TrackPlayer.reset()
            TrackPlayer.seekTo(0)
            // TrackPlayer.destroy()
        }
    }, [])
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const {position, duration} = useProgress(250);
    const playbackState = usePlaybackState();

    useEffect(() => {
        const startPlayer = async () => {
            await TrackPlayer.add({
                id: songDetails.id,
                url: audioLink,
                type: 'default',
                title: songDetails.title,
                album: songDetails.album,
                artist: songDetails.artist,
                artwork: IMAGE_RANDOM_BY_INDEX(Math.floor(Math.random() * 100)),
            });
            onButtonPressed();
            setIsTrackPlayerInit(true);
        }
        startPlayer();
    }, []);

    //this hook updates the value of the slider whenever the current position of the song changes
    useEffect(() => {
        if (!isSeeking && position && duration) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    usePlaybackState(playbackState, event => {
        if (event.state === State.Playing) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    });

    useTrackPlayerEvents([
        Event.PlaybackState,
        Event.PlaybackError,
    ], (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
        }
        if (event.type === Event.PlaybackState) {
            if (event.state === State.Playing) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
    });

    const onButtonPressed = () => {

        if (!isPlaying) {
            TrackPlayer.play();
            setIsPlaying(true);
        } else {
            TrackPlayer.pause();
            setIsPlaying(false);
        }
    };

    const slidingStarted = () => {
        setIsSeeking(true);
    };

    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
        setSliderValue(value);
        setIsSeeking(false);
    };

    // console.log(sliderValue)
    const currentTimeString = toHHMMSS(duration*sliderValue);
    const durationString = toHHMMSS(duration);
    const data = (sliderValue ?? 0)*(WINDOW_WIDTH-40) - (sliderValue > 0.9 ? 45 : sliderValue > 0.8 ? 40 : sliderValue > 0.5 ? 30 : 20)
    if (isFullScreen) {
        return (
            <View style={styles.bigContainer}>
                <View style={styles.sliderWrapper}>
                    <Slider
                        style={styles.progressBar}
                        minimumValue={0}
                        maximumValue={1}
                        value={sliderValue}
                        minimumTrackTintColor={COLOR_BASIC_2}
                        maximumTrackTintColor={COLOR_BASIC_1}
                        onSlidingStart={slidingStarted}
                        onSlidingComplete={slidingCompleted}
                        thumbTintColor={COLOR_BASIC_1}
                    />
                    <View style={[
                        styles.timeBar,
                        {
                            left: data
                        }
                    ]}>
                        <Text style={styles.timeBarText}>{currentTimeString}/{durationString}</Text>
                    </View>
                </View>
                <View style={styles.playAction}>
                    <TouchableOpacity onPress={() => {
                        // getRandomTrackId()
                        //     .then(res => {
                        //         console.log(res);
                        //         addTrackToPlaylist(res);
                        //     })
                    }}>
                        <IonIcon
                            name={'shuffle'}
                            size={24}
                            color={COLOR_BASIC_2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <IonIcon
                            name={'ios-play-skip-back'}
                            size={24}
                            color={COLOR_BASIC_2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        onButtonPressed()
                    }}>
                        <IonIcon
                            name={isPlaying ? 'ios-pause' : 'ios-play'}
                            size={24}
                            color={COLOR_BASIC_2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        getRandomTrackId()
                            .then(res => {
                                console.log(res);
                                addTrackToPlaylist(res);
                            })
                    }}>
                        <IonIcon
                            name={'ios-play-skip-forward'}
                            size={24}
                            color={COLOR_BASIC_2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        // getRandomTrackId()
                        //     .then(res => {
                        //         console.log(res);
                        //         addTrackToPlaylist(res);
                        //     })
                    }}>
                        <IonIcon
                            name={'repeat'}
                            size={24}
                            color={COLOR_BASIC_2}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.smallContainer}>
            <TouchableOpacity
                style={styles.smallContent}
                onPress={() => {
                    onFullScreenTrack()
                }}
            >
                <Image
                    source={{
                        uri: trackData.image
                    }}
                    style={styles.smallTrackImg}
                />
                <Text style={styles.smallTrackNameText}>
                    {trackData.name}
                </Text>
            </TouchableOpacity>
            <View style={styles.smallAction}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                        onButtonPressed()
                    }}
                >
                    <IonIcon
                        name={isPlaying ? 'ios-pause' : 'ios-play'}
                        size={24}
                        color={COLOR_BASIC_2}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                        // onButtonPressed()
                        onResetPlaylist();
                    }}
                >
                    <IonIcon
                        name={'close'}
                        size={24}
                        color={COLOR_BASIC_2}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TrackPlayApp;

const styles = StyleSheet.create({
    bigContainer: {
        paddingTop: 0,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    sliderWrapper: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        width: WINDOW_WIDTH - 40,
    },
    progressBar: {
        height: 24,
        width: WINDOW_WIDTH - 40,
    },
    timeBar: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 9,
        position: 'absolute',
        top: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_BASIC_1
    },
    timeBarText: {
        fontSize: 10,
        color: COLOR_WHITE,
    },
    mainContainer: {
        // flex: 1,
        backgroundColor: '#EDEDED',
    },
    controlsContainer: {
        flex: 0.45,
        justifyContent: 'flex-start',
    },
    albumImage: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        borderRadius: 40,
    },
    playAction: {
        width: '100%',
        // width: WINDOW_WIDTH*0.6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    smallContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    smallContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallTrackImg: {
        height: 36,
        width: 36,
        borderRadius: 18
    },
    smallTrackNameText: {
        paddingHorizontal: 5,
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    smallAction: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    actionBtn: {
        marginHorizontal: 5,
        color: COLOR_BASIC_2,
    }
});
