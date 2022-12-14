import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppContext} from '../contexts/AppContext';
import Loading from '../themes/Loading';
import {useTranslation} from "react-i18next";
import OpenAdCustom from '../themes/AdsCustom/OpenAdCustom';
import TabHome from './container/TabHome';
import TrackPlayer from './TrackPlayer';
import TrackPlayApp from './TrackPlayer/TrackPlayApp';
import TrackPage from './container/NavTopTab';
import NavTopTab from './container/NavTopTab';
import {DONE} from '../utils/constants';
import HomePage from './container/Home/HomePage';
import PlaylistPage from './container/Home/PlaylistPage';
import {COLOR_WHITE} from '../utils/colors';
const Stack = createStackNavigator()


const NavContainer = (props) => {
    const {
        loadingOpenAd,
        isConnectedInternet
    } = useContext(AppContext);
    const {t} = useTranslation();

    const {
        appData,
        setAppData,
        dbDone
    } = useContext(AppContext);
    const {
        track
    } = appData;
    if (
        !loadingOpenAd
        || dbDone !== DONE
    ) {
        return (
            <View style={styles.container}>
                {(isConnectedInternet && !loadingOpenAd) && <OpenAdCustom />}
                <Image
                    style={styles.logoImg}
                    source={require('./../assets/images/ant.png')}
                />
                <Loading />
            </View>
        )
    }

    const RenderNavTopTab = (props) => {
        return (
            <NavTopTab
                {...props}
            />
        )
    }
    return (
        <View style={[
            styles.container,
        ]}>
            <View style={[
                styles.home,
                track ? styles.homeWithPlayer : {}
            ]}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: true,
                    }}
                >
                    <Stack.Screen
                        name={'navTopTab'}
                        component={RenderNavTopTab}
                        options={{
                            header: (props) => {
                                return (
                                    <></>
                                )
                            },
                        }}
                    />
                    <Stack.Screen
                        name={'playlistPage'}
                        component={PlaylistPage}
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

            {track && <TrackPlayer {...props}/>}
        </View>
    )
}

export default NavContainer;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
    },
    homeWithPlayer: {
        // marginBottom: 60
    },
    home: {
        flex: 1,
        width: '100%',
    },
    logoImg: {
        width: 120,
        height: 120,
    }
})
