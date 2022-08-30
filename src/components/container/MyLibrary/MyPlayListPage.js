import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_GREEN, COLOR_WHITE, COLOR_WHITE_OPACITY} from '../../../utils/colors';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMAGE_RANDOM_BY_INDEX, WINDOW_WIDTH} from '../../../utils/constants';
import {MyPlaylistContext} from './contexts/MyPlaylistContext';
import Loading from '../../../themes/Loading';
import ModalMyPlaylistNew from './ModalMyPlaylistNew';
import Header from '../Header';


const MyPlayListPage = (props) => {
    const {
        myPlaylists,
        getMyPlaylists,
        setMyPlaylist,
        MyPlaylist,
        loadingMyPlaylists
    } = useContext(MyPlaylistContext);

    const {
        navigation,
        route,
    } = props;
    const [isModalNew, setIsModalNew] = useState(false);

    const data = [...myPlaylists];
    const showNewGroupBtn = () => {
        return (
            <View style={styles.newGroup}>
                <TouchableOpacity style={styles.newGroupBtn} onPress={() => {
                    setIsModalNew(true);
                }}>
                    <MaterialCommunityIcon
                        name="playlist-plus"
                        size={36}
                        color={COLOR_BASIC_2}
                    />
                    <Text style={styles.newGroupBtnText}>
                        new playlist
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Header />
            {
                loadingMyPlaylists
                ?
                    <Loading />
                    :
                    data.length === 0
                ?
                        <View style={styles.emptyWrapper}>
                            {showNewGroupBtn()}
                        </View>
                        :
                        <>
                            <FlatList
                                style={styles.flatlistContainer}
                                data={[
                                    {isBtnNew: true},
                                    ...myPlaylists,
                                ]}
                                renderItem={({item, index}) => {
                                    if (item.isBtnNew) {
                                        return (
                                            <View style={styles.itemMyPlaylistWrapper}>
                                                {showNewGroupBtn()}
                                            </View>
                                        )
                                    }
                                    return (
                                        <View style={styles.itemMyPlaylistWrapper}>
                                            <TouchableOpacity style={styles.itemMyPlaylist}
                                                onPress={() => {
                                                    navigation.navigate('myPlayListView', {
                                                        myPlaylist: item
                                                    })
                                                }}
                                            >
                                                <View style={styles.itemMyPlaylistBg}>

                                                </View>
                                                <Image
                                                    style={styles.myPlaylistImg}
                                                    source={{
                                                        uri: IMAGE_RANDOM_BY_INDEX(index)
                                                    }}
                                                />
                                                <View style={styles.itemMyPlaylistContent}>
                                                    <Text style={styles.itemMyPlaylistNameText}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                                numColumns={2}
                            />
                        </>
            }
            {isModalNew && <ModalMyPlaylistNew
                onClose={() => {
                    setIsModalNew(false);
                }}
            />}
        </View>
    )
}

export default MyPlayListPage;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE
    },
    emptyWrapper: {
        flex: 1,
        height: WINDOW_WIDTH/2,
        width: WINDOW_WIDTH/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newGroup: {
        width: '100%',
        height: '100%',
    },
    newGroupBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: COLOR_BASIC_2,
        width: '100%',
        height: '100%',
    },
    newGroupBtnText: {
        color: COLOR_BASIC_2,
        textTransform: 'uppercase',
    },
    flatlistContainer: {
        backgroundColor: COLOR_WHITE
    },
    itemMyPlaylistWrapper: {
        height: WINDOW_WIDTH/2,
        width: WINDOW_WIDTH/2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: COLOR_WHITE,
    },
    itemMyPlaylist: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: COLOR_BASIC_2,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    itemMyPlaylistBg: {
        backgroundColor: COLOR_WHITE_OPACITY(0.6),
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 99,
        zIndex: 99,
    },
    myPlaylistImg: {
        position: 'absolute',
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    },
    itemMyPlaylistContent: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 999,
        zIndex: 999,
    },
    itemMyPlaylistNameText: {
        color: COLOR_BASIC_1,
        fontWeight: '500'
    }
})
