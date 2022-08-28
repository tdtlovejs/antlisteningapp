import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabHome from './TabHome';
import TabLiked from './TabLiked';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const NavTopTab = (props) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={TabHome} />
            <Tab.Screen name="liked" component={TabLiked} />
        </Tab.Navigator>
    )
}

export default NavTopTab;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
