import {StyleSheet, Animated, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY} from '../../utils/colors';
import {getRandomTracks} from '../../databases/db';
import Loading from '../../themes/Loading';
import {WINDOW_WIDTH} from '../../utils/constants';

const groups = [
    [0,1],
    [2,3],
    [4,5],
    [6,7],
    [8,9]
]
const TrackRandom = (props) => {
    // const [groups, setGroups] = useState([]);
    const [tracks, setTracks] = useState([]);
    let xOffset = new Animated.Value(0);
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: xOffset } } }],
        { useNativeDriver: false }
    );


    useEffect(() => {
        getRandomTracks(10)
            .then(res => {
                setTracks(res);
            })
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    random track
                </Text>
                <TouchableOpacity onPress={() => {

                }}>
                    <IonIcon
                        name={'refresh'}
                        size={24}
                        color={COLOR_BASIC_2}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {
                    tracks.length === 10
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
                                groups.map((itemG, indexG) => {
                                    return (
                                        <View style={styles.group}>
                                            {
                                                itemG.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity style={styles.track}>
                                                            <Text
                                                                style={styles.trackNameText}
                                                                numberOfLines={2}
                                                            >
                                                                {tracks[item].name}
                                                            </Text>
                                                        </TouchableOpacity>
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

export default TrackRandom;

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
        paddingHorizontal: 10
    },
    track: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: COLOR_BASIC_2_OPACITY(0.1),
        marginBottom: 10,
        borderRadius: 15,
        height: 60,
    },
    trackNameText: {
        color: COLOR_BASIC_1,
    }
})
