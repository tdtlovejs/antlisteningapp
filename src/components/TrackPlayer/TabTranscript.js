import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR_BASIC_2} from '../../utils/colors';


const TabTranscript = (props) => {
    const {
        trackData
    } = props;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.transcript}>
                <Text style={styles.transcriptText}>
                    {trackData?.transcript ?? ''}
                </Text>
            </ScrollView>
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
    transcript: {
       padding: 10,
    },
    transcriptText: {
        fontSize: 15,
        lineHeight: 24,
        color: COLOR_BASIC_2,
    }
})
