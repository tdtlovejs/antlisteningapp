import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {WINDOW_WIDTH} from '../../utils/constants';

const spinValue = new Animated.Value(0);

const TabDisc = (props) => {
    const {
        trackData
    } = props;
    useEffect(() => {

        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <View style={styles.container}>
                <Animated.Image
                    style={[
                        styles.trackImg,
                        {
                            transform: [{ rotate: spin }]
                        }
                    ]}
                    source={{
                        uri: trackData.image
                    }}
                />
        </View>
    )
}

export default TabDisc;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackImg: {
        width: WINDOW_WIDTH/2+20,
        height: WINDOW_WIDTH/2+20,
        borderRadius: WINDOW_WIDTH/4+10
    }
})
