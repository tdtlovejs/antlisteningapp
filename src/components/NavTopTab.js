import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabHome from './TabHome';
import TabLiked from './TabLiked';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {COLOR_WHITE, WHITE} from '../utils/colors';

const Tab = createMaterialTopTabNavigator();

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
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={TabHome} />
                    <Tab.Screen name="liked" component={TabLiked} />
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
        justifyContent: 'center'
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
