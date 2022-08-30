import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLOR_BASIC_1} from '../utils/colors';
const LoadingAction = (props) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                size="large"
                color={COLOR_BASIC_1}
            />
        </View>
    )
}

export default LoadingAction;
const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        elevation: 999
    },
})

