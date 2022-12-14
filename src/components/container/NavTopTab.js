import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import TabHome from './TabHome';
import TabLiked from './TabLiked';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_WHITE, WHITE} from '../../utils/colors';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TabMyLibrary from './TabMyLibrary';
import MyPlaylistContextProvider from './MyLibrary/contexts/MyPlaylistContext';
import {AppContext} from '../../contexts/AppContext';
import MyPlaylistView from './MyLibrary/MyPlaylistView';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const NavTopTab = (props) => {
    const {
        appData,
        setAppData,
        dbDone
    } = useContext(AppContext);
    const {
        track
    } = appData;
    console.log(track)

    const showTabScreen = (component) => {
        return (
            <View style={[
                styles.tabScreen,
                track ? styles.tabScreenWithPlayer : {}
            ]}>
                {component}
            </View>
        )
    }

    const RenderTabHome = (props) => {
        return (
            <View style={[
                styles.tabScreen,
                track ? styles.tabScreenWithPlayer : {}
            ]}>
                <TabHome {...props}/>
            </View>
        )
    }
    const RenderTabLiked = (props) => {
        return (
            <View style={[
                styles.tabScreen,
                track ? styles.tabScreenWithPlayer : {}
            ]}>
                <TabLiked {...props}/>
            </View>
        )
    }
    return (
        <View style={styles.container}>

            <View style={[
                styles.body,
                track ? styles.bodyWithPlayer : {}
            ]}>
                <Tab.Navigator
                    headerShown={false}
                >
                    <Tab.Screen
                        name="home"
                        component={RenderTabHome}
                        options={{
                            tabBarIcon: ({ route, focused, color }) => {
                                return (
                                    <IonIcon
                                        name={focused ? 'home' : 'home-outline'}
                                        color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                        size={24}
                                    />
                                )
                            },
                            tabBarShowLabel: false,
                            headerShown: false,
                            // tabBarActiveBackgroundColor: 'red'
                        }}
                    />
                    {/*<Tab.Screen*/}
                    {/*    name="mylibrary"*/}
                    {/*    component={(props) => {*/}
                    {/*        return (*/}
                    {/*            <View style={[*/}
                    {/*                styles.tabScreen,*/}
                    {/*                track ? styles.tabScreenWithPlayer : {}*/}
                    {/*            ]}>*/}
                    {/*                <MyPlaylistContextProvider>*/}
                    {/*                    <TabMyLibrary {...props} />*/}
                    {/*                </MyPlaylistContextProvider>*/}
                    {/*            </View>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*    options={{*/}
                    {/*        tabBarIcon: ({ route, focused, color }) => {*/}
                    {/*            return (*/}
                    {/*                <MaterialIcon*/}
                    {/*                    name={focused ? 'my-library-music' : 'my-library-music'}*/}
                    {/*                    color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}*/}
                    {/*                    size={24}*/}
                    {/*                />*/}
                    {/*            )*/}
                    {/*        },*/}
                    {/*        tabBarShowLabel: false,*/}
                    {/*        headerShown: false*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <Tab.Screen
                        name="liked"
                        component={RenderTabLiked}
                        options={{
                            tabBarIcon: ({ route, focused, color }) => {
                                return (
                                    <IonIcon
                                        name={focused ? 'heart' : 'heart-outline'}
                                        color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                        size={24}
                                    />
                                )
                            },
                            tabBarShowLabel: false,
                            headerShown: false
                        }}
                    />

                </Tab.Navigator>
            </View>
        </View>
    )
}

export default NavTopTab;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
    },
    tabScreen: {

    },
    tabScreenWithPlayer: {
        paddingBottom: 60
    },

    body: {
        flex: 1,
        width: '100%',
    }
})
