import React, {useContext, useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import {
    ACTIVE_1,
    DARK_1,
    DARK_2,
    LIGHT_1,
    LIGHT_2,
} from '../utils/colors';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Sound from 'react-native-sound';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {toHHMMSS} from '../utils/functions';
import {AppContext} from '../contexts/AppContext';
const STATE_PAUSE = 'pause';
const STATE_PLAYING = 'playing';
let sound = null;
Sound.setCategory('Playback');

const AudioPlayer = (props) => {
    const {
        audioUrl,
        stopAudio
    } = props;
    let sliderEditing = false;
    const {
        theme
    } = useContext(AppContext);
    const [dataState, setDataState] = useState({
        playState: STATE_PAUSE,
        playSeconds: 0,
        duration: 0,
    })
    const {
        playState
    } = dataState;

    useEffect(() => {
        onPlay();
        return () => {
            if (sound) {
                sound.reset()
                sound = null;
            }
        }
    }, [])
    useEffect(() => {
        if (stopAudio) {
            if (sound) {
                sound.pause();
            }
            setDataState(prev => ({
                ...prev,
                playState: STATE_PAUSE,
            }))
        }
    }, [stopAudio])

    useEffect(() => {
        let timeout = setInterval(() => {
            if(sound && sound.isLoaded() && dataState.playState === STATE_PLAYING && !sliderEditing){
                sound.getCurrentTime((seconds, isPlaying) => {
                    setDataState(prev => ({
                        ...prev,
                        playSeconds: seconds,
                    }))
                })
            }
        }, 100);
        return () => {
            clearInterval(timeout);
        }
    }, [playState, sound])
    const onPlay = () => {
        if (sound) {
            sound.play(playComplete)
            setDataState(prev => ({
                ...prev,
                playState: STATE_PLAYING,
                duration: sound.getDuration()
            }))
        } else {
            sound = new Sound(
                audioUrl,
                null,
                error => {
                    if (error) {
                        setDataState(prev => ({
                            ...prev,
                            playState: STATE_PAUSE,
                        }))
                    } else {
                        setDataState(prev => ({
                            ...prev,
                            playState: STATE_PLAYING,
                            duration: sound.getDuration()
                        }))
                        if (sound) {
                            sound.play(playComplete)
                        }
                    }
                },
            );
        }
    }

    const playComplete = (success) => {
        if(sound){
            if (success) {
            } else {
            }
            setDataState(prev => ({
                ...prev,
                playState: STATE_PAUSE,
                playSeconds: 0
            }))
            sound.setCurrentTime(0);
        }
    }

    const onPause = () => {
        if(sound){
            sound.pause();
        }

        setDataState(prev => ({
            ...prev,
            playState: STATE_PAUSE,
        }))
    }

    const jumpPrev10Seconds = () => {jumpSeconds(-10);}
    const jumpNext10Seconds = () => {jumpSeconds(10);}
    const jumpSeconds = (secsDelta) => {
        if(sound){
            sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > dataState.duration) nextSecs = dataState.duration;
                sound.setCurrentTime(nextSecs);
                setDataState(prev => ({
                    ...prev,
                    playSeconds:nextSecs
                }))
            })
        }
    }
    const onSliderEditStart = (value) => {
        sliderEditing = true;
    }
    const onSliderEditEnd = () => {
        sliderEditing = false;
    }
    const onSliderEditing = value => {
        if(sound){
            sound.setCurrentTime(value);
            setDataState(prev => ({
                ...prev,
                playSeconds:value
            }))
        }
    }

    const currentTimeString = toHHMMSS(dataState.playSeconds);
    const durationString = toHHMMSS(dataState.duration);

    return (
        <View style={[
            styles.container,
        ]}>
            <View style={styles.audioAction}>
                <TouchableOpacity onPress={jumpPrev10Seconds} style={styles.skipBtn}>
                    <IonIcon
                        name="ios-play-skip-back-circle-outline"
                        color={ACTIVE_1}
                        size={30}
                    />
                </TouchableOpacity>
                {dataState.playState === STATE_PLAYING &&
                    <TouchableOpacity onPress={onPause} style={{marginHorizontal:20}}>
                        <IonIcon
                            name="pause-circle"
                            color={ACTIVE_1}
                            size={30}
                        />
                    </TouchableOpacity>}
                {dataState.playState === STATE_PAUSE &&
                    <TouchableOpacity onPress={onPlay} style={{marginHorizontal:20}}>
                        <IonIcon
                            name="ios-play-circle-sharp"
                            color={ACTIVE_1}
                            size={30}
                        />
                    </TouchableOpacity>}
                <TouchableOpacity onPress={jumpNext10Seconds} style={styles.skipBtn}>
                    <IonIcon
                        name="ios-play-skip-forward-circle-outline"
                        color={ACTIVE_1}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.sliderWrapper}>
                <Text style={[
                    styles.timeText,
                ]}>{currentTimeString}</Text>
                <Slider
                    onTouchStart={onSliderEditStart}
                    onTouchEnd={onSliderEditEnd}
                    onValueChange={onSliderEditing}
                    style={styles.slider}
                    value={dataState.playSeconds}
                    maximumValue={dataState.duration}
                    minimumTrackTintColor={ACTIVE_1}
                    maximumTrackTintColor={ACTIVE_1}
                    thumbTintColor={ACTIVE_1}
                />
                <Text style={[
                    styles.timeText,
                ]}>{durationString}</Text>
            </View>
        </View>
    )
}

export default AudioPlayer;
const styles = StyleSheet.create({
    container: {
        backgroundColor: LIGHT_2,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 9,
    },
    containerDark: {
        backgroundColor: DARK_2,
    },
    audioAction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40
    },
    skipBtn: {
        justifyContent:'center'
    },
    sliderWrapper: {
        flexDirection: 'row',
        width: '100%'
    },
    slider: {
       flex: 1,
    },
    timeText: {
        color: DARK_1,
    },
    timeTextDark: {
        color: LIGHT_1
    }
})
