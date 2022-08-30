import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_GREEN, COLOR_WHITE, COLOR_WHITE_OPACITY} from '../../utils/colors';
import MyPlaylistContextProvider, {MyPlaylistContext} from './MyLibrary/contexts/MyPlaylistContext';
import {IMAGE_RANDOM_BY_INDEX, WINDOW_WIDTH} from '../../utils/constants';
import {useIsFocused} from '@react-navigation/native';
import MyPlaylistView from './MyLibrary/MyPlaylistView';
import {createStackNavigator} from '@react-navigation/stack';
import MyPlayListPage from './MyLibrary/MyPlayListPage';

const Stack = createStackNavigator()

const TabMyLibrary = (props) => {
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
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getMyPlaylists();
        }
    }, [isFocused])

    return (
        <View style={{
            backgroundColor: '#fff',
            height: '100%',
        }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                }}
            >
                <Stack.Screen
                    name={'myPlayListPage'}
                    component={(props) => {
                        return (
                            <MyPlayListPage {...props}/>
                        )
                    }}
                    options={{
                        header: (props) => {
                            return (
                                <></>
                            )
                        },
                    }}
                />
                <Stack.Screen
                    name={'myPlayListView'}
                    component={MyPlaylistView}
                    options={{
                        header: (props) => {
                            return (
                                <></>
                            )
                        },
                    }}
                />
            </Stack.Navigator>
        </View>
    )
}

export default TabMyLibrary;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE
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
