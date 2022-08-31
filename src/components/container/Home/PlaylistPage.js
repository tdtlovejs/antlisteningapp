import {StyleSheet, Animated, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY, COLOR_WHITE} from '../../../utils/colors';
import {getRandomTracks, getTracksByListIds} from '../../../databases/db';
import Loading from '../../../themes/Loading';
import {WINDOW_WIDTH} from '../../../utils/constants';
import TrackItem from '../../TrackItem';
import {shuffleArray} from '../../../utils/functions';
import TrackItemB from '../../TrackItemB';

const groups = [
    [0,1],
    [2,3],
    [4,5],
    [6,7],
    [8,9]
]
const PlaylistPage = (props) => {
    const {
        navigation,
        route,
    } = props;

    const {
        playlist
    } = route.params;
    const [loading, setLoading] = useState(false);
    const [tracks, setTracks] = useState([]);
    let xOffset = new Animated.Value(0);
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: xOffset } } }],
        { useNativeDriver: false }
    );

    console.log('playlist ',tracks.length)
    useEffect(() => {
        getTracksByListIds(playlist.tracks)
            .then(res => {
                setTracks(res);
            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <IonIcon
                        name='close'
                        size={24}
                        color={COLOR_BASIC_1}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {playlist.name}
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.trackNbText}>
                    {Array.isArray(playlist?.tracks) ? playlist.tracks.length : ''} tracks
                </Text>
                <TouchableOpacity style={styles.playShuffeeBtn}>
                    <Text style={styles.playShuffeeText}>
                        phát ngẫu nhiên
                    </Text>
                </TouchableOpacity>
                <ScrollView style={styles.trackList}>
                    {
                        tracks.map((item, index) => {
                            return (
                                <TrackItem
                                    track={item}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default PlaylistPage;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
    },
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
        paddingHorizontal: 50,
    },
    // headerText: {
    //     fontWeight: '500',
    //     fontSize: 16,
    //     color: COLOR_BASIC_1,
    // },
    content: {

    },
    group: {
        width: WINDOW_WIDTH - 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    groupItem: {
        flex: 1,
        padding: 5,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 14,
        color: COLOR_BASIC_1,
        letterSpacing: 1,
        // textTransform: 'uppercase',
    },
    iconBtn: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    nameText: {
        color: COLOR_BASIC_1,
        fontWeight: '500',
        fontSize: 15,
    },
    trackNbText: {
        color: COLOR_BASIC_2,
        fontWeight: '300',
        fontSize: 13,
    },
    playShuffeeBtn: {
        borderRadius: 20,
        backgroundColor: COLOR_BASIC_2_OPACITY(0.8),
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    playShuffeeText: {
        color: COLOR_WHITE,
        fontWeight: '500',
        fontSize: 15,
    },
    addTrackBtn: {
        alignItems: 'center'
    },
    addTrackText: {
        fontSize: 12,
        color: COLOR_BASIC_2,
    },
    trackList: {
        width: '100%'
    }
})
