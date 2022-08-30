import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY, COLOR_WHITE} from '../../../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {getMyPlaylistById, getTracksByListIds} from '../../../databases/db';
import TrackItem from '../../TrackItem';


const pageSize = 20;
const MyPlaylistView = (props) => {
    const {
        navigation,
        route,
    } = props;
    // const {
    //     myPlaylist
    // } = route.params;
    const [myPlaylist, setMyPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getMyPlaylistById(route.params.myPlaylist.id)
                .then(res => {
                    setMyPlaylist(res);
                })
        }
    }, [isFocused])

    // const tracks = Array.isArray(myPlaylist?.tracks) ? myPlaylist.tracks : [];

    useEffect(() => {
        if (myPlaylist) {
            const tracks = Array.isArray(myPlaylist?.tracks) ? myPlaylist.tracks : [];
            getTracksByListIds(tracks)
                .then(res => {
                    setTracks(res);
                })
        }
    }, [myPlaylist])
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
                        name='arrow-back'
                        size={24}
                        color={COLOR_BASIC_1}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {myPlaylist?.name}
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.trackNbText}>
                    {Array.isArray(myPlaylist?.tracks) ? myPlaylist.tracks.length : ''} tracks
                </Text>
                <TouchableOpacity style={styles.playShuffeeBtn}>
                    <Text style={styles.playShuffeeText}>
                        phát ngẫu nhiên
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addTrackBtn}
                    onPress={() => {
                        navigation.navigate('myPlayListAddTrack', {
                            myPlaylist: myPlaylist
                        })
                    }}
                >
                    <IonIcon
                        name={'add-circle-outline'}
                        size={24}
                        color={COLOR_BASIC_2}
                    />
                    <Text style={styles.addTrackText}>
                        add track
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

export default MyPlaylistView;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
        // marginTop: -50,
    },
    header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
        paddingHorizontal: 50,
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
