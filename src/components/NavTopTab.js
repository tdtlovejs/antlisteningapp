import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabHome from './TabHome';
import TabLiked from './TabLiked';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_WHITE, WHITE} from '../utils/colors';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const NavTopTab = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./../assets/images/ant.png')}
                    style={styles.logoImg}
                />
            </View>
            <View style={styles.body}>
                <Tab.Navigator
                    headerShown={false}
                >
                    <Tab.Screen
                        name="home"
                        component={TabHome}
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
                    <Tab.Screen
                        name="liked"
                        component={TabLiked}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    logoImg: {
        width: 36,
        height: 36,
    },
    body: {
        flex: 1,
        width: '100%',
    }
})
