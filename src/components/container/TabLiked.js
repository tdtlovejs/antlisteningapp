import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDataByQueryAndPaginate, getTracksByQueryAndPaginateAndFilters} from '../../databases/db';
import _ from 'lodash';
import {COLOR_WHITE} from '../../utils/colors';
import {isCloseToBottom} from '../../utils/functions';
import Loading from '../../themes/Loading';
import TrackItem from '../TrackItem';
import {useIsFocused} from '@react-navigation/native';

const pageSize = 20;
const TabLiked = (props) => {
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({
        page: null,
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
        if (isFocused) {
            setOptions({
                page: 1,
                isEnd: null,
                searchText: '',
                loading: false,
            })
        } else {
            console.log('isFocused ',isFocused)
            setData([]);
            setOptions({
                page: null,
                isEnd: null,
                searchText: '',
                loading: false,
            })
        }
    }, [isFocused])

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
        getTracksByQueryAndPaginateAndFilters(page, searchText.trim().toLowerCase(), pageSize, {
            liked: 1
        })
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
    return (
        <View style={styles.container}>
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
                            <TrackItem
                                track={item}
                                isPageLiked={true}
                            />
                        )
                    })
                }
                {
                    loading && <Loading />
                }
            </ScrollView>
        </View>
    )
}

export default TabLiked;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE
    },
    containerScroll: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
})
