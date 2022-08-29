import {StyleSheet, Text, View} from 'react-native';
import React from 'react';


const TabLiked = (props) => {
    return (
        <View style={styles.container}>
            <Text>
                TabLiked
            </Text>
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
