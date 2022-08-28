import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLOR_BASIC_1} from "../utils/colors";
const Loading = (props) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                size="large"
                color={COLOR_BASIC_1}
            />
        </View>
    )
}

export default Loading;
const styles = StyleSheet.create({
    loadingContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

