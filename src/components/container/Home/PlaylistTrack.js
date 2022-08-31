import {StyleSheet, Animated, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY} from '../../../utils/colors';
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
const PlaylistTrack = (props) => {
    const {
        playlist,
        navigation
    } = props;
    // const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tracks, setTracks] = useState([]);
    let xOffset = new Animated.Value(0);
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: xOffset } } }],
        { useNativeDriver: false }
    );


    useEffect(() => {
        getTracksByListIds(shuffleArray(playlist.tracks).slice(0, 10))
            .then(res => {
                setTracks(res);
            })
    }, [])



    const getTracks = () => {
        setLoading(true)
        getRandomTracks(10)
            .then(res => {
                setTracks(res);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {playlist.name}
                </Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('playlistPage', {
                        playlist: playlist
                    })
                }}>
                    <IonIcon
                        name={'arrow-forward'}
                        size={24}
                        color={COLOR_BASIC_2}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {
                    (tracks.length !== 0 && !loading)
                        ?
                        <Animated.ScrollView
                            scrollEventThrottle={16}
                            onScroll={onScroll}
                            horizontal
                            pagingEnabled
                            style={styles.scrollView}
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                groups.filter((item, index) => {
                                    return index < tracks.length/2;
                                }).map((itemG, indexG) => {
                                    return (
                                        <View style={styles.group}>
                                            {
                                                itemG.map((item, index) => {
                                                    return (
                                                        <View style={styles.groupItem}>
                                                            <TrackItemB
                                                                track={tracks[item]}
                                                            />
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </Animated.ScrollView>
                        :
                        <Loading />
                }

            </View>
        </View>
    )
}

export default PlaylistTrack;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    headerText: {
        fontWeight: '500',
        fontSize: 16,
        color: COLOR_BASIC_1,
    },
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
    }
})
