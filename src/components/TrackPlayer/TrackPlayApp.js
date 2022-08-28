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
import {COLOR_BASIC_1} from '../../utils/colors';
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
        audioLink
    } = props;
    const {
        addTrackToPlaylist
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
    const data = (sliderValue ?? 0)*(WINDOW_WIDTH - 20)-50;
    return (
        <>
            <View style={styles.sliderWrapper}>
                <Slider
                    style={styles.progressBar}
                    minimumValue={0}
                    maximumValue={1}
                    value={sliderValue}
                    minimumTrackTintColor="#111000"
                    maximumTrackTintColor="#000000"
                    onSlidingStart={slidingStarted}
                    onSlidingComplete={slidingCompleted}
                    thumbTintColor="#000"
                />
                <View style={[
                    styles.timeBar,
                    {
                        left: data > 0 ? data : 0
                    }
                ]}>
                    <Text style={styles.timeBarText}>{currentTimeString}/{durationString}</Text>
                </View>

            </View>
            <View style={styles.playAction}>
                <TouchableOpacity onPress={() => {

                }}>
                    <IonIcon
                        name={'ios-play-skip-back'}
                        size={24}
                        color={COLOR_BASIC_1}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    onButtonPressed()
                }}>
                    <IonIcon
                        name={isPlaying ? 'ios-pause' : 'ios-play'}
                        size={24}
                        color={COLOR_BASIC_1}
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
                        color={COLOR_BASIC_1}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TrackPlayApp;

const styles = StyleSheet.create({
    sliderWrapper: {
        height: 36,
        flexDirection: 'row',
        width: WINDOW_WIDTH - 20
    },
    progressBar: {
        height: 20,
        width: '100%',
        // paddingBottom: 90,
        flex: 1,
    },
    timeBar: {
        padding: 2,
        borderRadius: 9,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeBarText: {
        fontSize: 12
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
        width: WINDOW_WIDTH*0.6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
