import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDataByQueryAndPaginate, getTest} from '../../databases/db';
import {useTranslation} from 'react-i18next';
import _, {debounce} from 'lodash';
import Input from '../../themes/Input';
import {isCloseToBottom} from '../../utils/functions';
import Loading from '../../themes/Loading';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY, COLOR_WHITE} from '../../utils/colors';
import {AppContext} from '../../contexts/AppContext';
import IonIcon from 'react-native-vector-icons/Ionicons';
import TrackRandom from './Home/TrackRandom';
const pageSize = 10;
const TabHome = (props) => {
    const {
        navigation,
        route,
    } = props;
    const {
        appData,
        setAppData,
        addTrackToPlaylist
    } = useContext(AppContext);
    const {t} = useTranslation();
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

    // const addTrackToPlaylist = (idTrack) => {
    //     let playlistTemp = appData.playlist.filter(item => item !== idTrack);
    //     setAppData(prev => ({
    //         playlist: [
    //             ...idTrack,
    //             playlistTemp
    //         ],
    //         track: idTrack
    //     }))
    //
    // }

    console.log()
    return (
        <View style={styles.container}>
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
            <TrackRandom
            />
            {/*<ScrollView*/}
            {/*    onScroll={({nativeEvent}) => {*/}
            {/*        if (isCloseToBottom(nativeEvent)) {*/}
            {/*            if (!isEnd && !loading) {*/}
            {/*                setOptions(prev => ({*/}
            {/*                    ...prev,*/}
            {/*                    page: prev.page + 1*/}
            {/*                }))*/}
            {/*            }*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    scrollEventThrottle={400}*/}
            {/*    style={styles.containerScroll}*/}
            {/*>*/}
            {/*    {*/}
            {/*        data.map((item, index) => {*/}
            {/*            return (*/}
            {/*                <TouchableOpacity style={styles.item} key={item.id} onPress={() => {*/}
            {/*                    console.log(item.id)*/}
            {/*                    addTrackToPlaylist(item.id)*/}
            {/*                }}>*/}
            {/*                    <Text style={styles.itemText}>*/}
            {/*                        {item.name}*/}
            {/*                    </Text>*/}
            {/*                    {*/}
            {/*                        item.questions.length > 0*/}
            {/*                        ?*/}
            {/*                            <Text>*/}
            {/*                              has questions*/}
            {/*                            </Text>*/}
            {/*                            :*/}
            {/*                            <></>*/}
            {/*                    }*/}
            {/*                </TouchableOpacity>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*    {*/}
            {/*        loading && <Loading />*/}
            {/*    }*/}
            {/*</ScrollView>*/}
        </View>
    );
};

export default TabHome;
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: COLOR_WHITE
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
    item: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: COLOR_BASIC_2_OPACITY(0.2)
    },
    itemText: {
        fontWeight: '500',
        fontSize: 15,
    }
});
