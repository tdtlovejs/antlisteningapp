import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY} from '../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {updateLiked} from '../databases/db';
import TrackPlayer from 'react-native-track-player';
import {IMAGE_RANDOM_BY_INDEX, randomRange, WINDOW_WIDTH} from '../utils/constants';
import {AppContext} from '../contexts/AppContext';

const TrackItemB = (props) => {
    const {
        isPageLiked,

    } = props;
    const {
        addTrackToPlaylist
    } = useContext(AppContext);
    const [track, setTrack] = useState(props.track);

    const toggleLiked = () => {
        updateLiked(track.id, !track.liked)
            .then(res => {
                setTrack(prev => ({
                    ...prev,
                    liked: !prev.liked
                }))
            })
            .catch(err => {

            })
    }

    if (isPageLiked && !track.liked) {
        return (
            <></>
        )

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.info} onPress={() => {
                addTrackToPlaylist(track.id);
            }}>
                <Text
                    style={styles.trackNameText}
                    numberOfLines={4}
                >
                    {track.name}
                </Text>
            </TouchableOpacity>
            <View style={styles.action}>
                <TouchableOpacity onPress={() => {
                    toggleLiked()
                }}>
                    <IonIcon
                        name={track.liked ? 'heart' : 'heart-outline'}
                        size={24}
                        color={COLOR_BASIC_2}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TrackItemB;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: COLOR_BASIC_2_OPACITY(0.1),
        marginBottom: 10,
        borderRadius: 15,
        height: WINDOW_WIDTH/2 - 60,
    },
    info: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    action: {
        paddingHorizontal: 5,
    },
    trackNameText: {
        color: COLOR_BASIC_1,
    }
})
