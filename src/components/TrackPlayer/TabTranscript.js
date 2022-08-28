import {StyleSheet, Text, View} from 'react-native';
import React from 'react';


const TabTranscript = (props) => {
    const {
        trackData
    } = props;
    return (
        <View style={styles.container}>
            <Text>
                {trackData?.transcript ?? ''}
            </Text>
        </View>
    )
}

export default TabTranscript;

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
