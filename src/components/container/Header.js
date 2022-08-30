import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDataByQueryAndPaginate, getTracksByQueryAndPaginateAndFilters} from '../../databases/db';
import _ from 'lodash';
import {COLOR_WHITE} from '../../utils/colors';
import {isCloseToBottom} from '../../utils/functions';
import Loading from '../../themes/Loading';
import TrackItem from '../TrackItem';
import {useIsFocused} from '@react-navigation/native';

const pageSize = 20;
const Header = (props) => {

    return (
        <View style={styles.header}>
            <Image
                source={require('../../assets/images/ant.png')}
                style={styles.logoImg}
            />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
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
})
