import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY, COLOR_WHITE} from '../../../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Input from '../../../themes/Input';
import {isCloseToBottom} from '../../../utils/functions';
import {getDataByQueryAndPaginate, updateMyPlaylistById} from '../../../databases/db';
import _, {debounce} from 'lodash';
import Loading from '../../../themes/Loading';
import LoadingAction from '../../../themes/LoadingAction';


const pageSize = 20;
const MyPlaylistAddTrack = (props) => {
    const {
        navigation,
        route,
    } = props;
    const [loadingAction, setLoadingAction] = useState(false);
    const [myPlaylist, setMyPlaylist] = useState(route.params.myPlaylist);
    const [data, setData] = useState([]);
    const [searchTextTemp, setSearchTextTemp] = useState('');
    const [options, setOptions] = useState({
        page: 1,
        isEnd: null,
        searchText: '',
        loading: false,
    })
    const {
        page,
        isEnd,
        searchText,
        loading,
    } = options;

    // useEffect(() => {
    //     console.log('myPlaylistmyPlaylistmyPlaylist ',myPlaylist)
    // }, [myPlaylist])

    useEffect(() => {
        if (page) {
            getPromiseData(page, searchText)
        }
    }, [page, searchText])

    const getPromiseData = (page, searchText) => {
        setOptions(prev => ({
            ...prev,
            loading: true
        }))
        getDataByQueryAndPaginate(page, searchText.trim().toLowerCase(), pageSize)
            .then(res => {
                console.log(res.length)
                if (page === 1) {
                    setData(res);
                } else {
                    setData(prev => (_.uniqBy([
                        ...prev,
                        ...res
                    ], 'id')));
                }
                if (res.length < pageSize) {
                    setOptions(prev => ({
                        ...prev,
                        isEnd: true,
                        loading: false
                    }))
                } else {
                    setOptions(prev => ({
                        ...prev,
                        loading: false
                    }))
                }
            })
            .catch(err => {
                setOptions(prev => ({
                    ...prev,
                    loading: false
                }))
            })
    }


    const onChangeSearch = (text) => {
        setOptions(prev => ({
            ...prev,
            page: 1,
            isEnd: false,
            searchText: text,
        }))
    }
    const debounceUpdate = useCallback(debounce((nextValue) => {
        onChangeSearch(nextValue);
    }, 200), [])
    useEffect(() => {
        debounceUpdate(searchTextTemp)
    }, [searchTextTemp])
    const tracks = Array.isArray(myPlaylist.tracks) ? myPlaylist.tracks : [];

    const onToggleTrackInMyPlaylist = (track) => {
        setLoadingAction(true);
        let tracksTemp = [...tracks];
        if (tracksTemp.includes(track.id)) {
            tracksTemp = tracksTemp.filter(item => item !== track.id)
        } else {
            tracksTemp = [
                ...tracksTemp,
                track.id
            ]
        }
        const myPlaylistTemp = {
            ...myPlaylist,
            tracks: tracksTemp
        }
        updateMyPlaylistById(myPlaylist.id, {
            ...myPlaylist,
            tracks: JSON.stringify(tracksTemp)
        })
            .then(res => {
                setMyPlaylist(myPlaylistTemp)
                setLoadingAction(false);
            })
            .catch(err => {
                setLoadingAction(false);
            })
    }
    return (
        <View style={styles.container}>
            {loadingAction && <LoadingAction />}
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
                <Text style={styles.labelText}>
                    add track to
                </Text>
                <Text style={styles.headerText}>
                    {myPlaylist.name}
                </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.search}>
                    <IonIcon
                        name='search'
                        color={'#fff'}
                        size={24}

                    />
                    <Input
                        placeholder={'search'}
                        value={searchTextTemp}
                        onChangeText={(text) => {
                            setSearchTextTemp(text);
                        }}
                        onPressIn={() => {
                            if (searchTextTemp !== '') {
                                setOptions(prev => ({
                                    ...prev,
                                    searching: true,
                                }));
                            }
                        }}
                        style={styles.searchInput}
                    />
                </View>
                <ScrollView
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            if (!isEnd && !loading) {
                                setOptions(prev => ({
                                    ...prev,
                                    page: prev.page + 1
                                }))
                            }
                        }
                    }}
                    scrollEventThrottle={400}
                    style={styles.containerScroll}
                >
                    {
                        data.map((item, index) => {
                            return (
                                <View
                                    style={styles.track}
                                    key={item.id}
                                    onPress={() => {

                                    }}
                                >
                                    <Text style={styles.trackText}>
                                        {item.name}
                                    </Text>
                                    <View style={styles.trackAction}>
                                        <TouchableOpacity
                                            style={styles.trackActionBtn}
                                            onPress={() => {
                                                onToggleTrackInMyPlaylist(item)
                                            }}
                                        >
                                            <IonIcon
                                                name={!tracks.includes(item.id) ? 'add-circle-outline' : 'checkmark-circle-outline'}
                                                size={24}
                                                color={COLOR_BASIC_2}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        loading && <Loading />
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default MyPlaylistAddTrack;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
        paddingHorizontal: 50,
    },
    labelText: {
        fontSize: 13,
        fontWeight: '300',
        color: COLOR_BASIC_2,
        marginRight: 5,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 14,
        color: COLOR_BASIC_1,
        letterSpacing: 1,
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
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

    search: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_BASIC_2_OPACITY(0.4),
        // paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    searchInput: {
        flex: 1,
        borderBottomWidth: 0
    },
    containerScroll: {
        width: '100%',
    },
    track: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_BASIC_2,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    trackText: {
        fontSize: 13,
        color: COLOR_BASIC_2,
        flex: 1,
    },
    trackAction: {

    },
    trackActionBtn: {

    }
})
