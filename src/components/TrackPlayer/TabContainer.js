import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLOR_BASIC_1, COLOR_BASIC_2} from '../../utils/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabDisc from './TabDisc';
import TabTranscript from './TabTranscript';
import TabExercise from './TabExercise';


const TAB_DISC = 'disc';
const TAB_TRANSCRIPT = 'transcript';
const TAB_EXERCISE = 'exercise';
const TabContainer = (props) => {
    const {
        trackData,
        role
    } = props;
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: TAB_DISC, title: TAB_DISC },
        { key: TAB_TRANSCRIPT, title: TAB_TRANSCRIPT },
        { key: TAB_EXERCISE, title: TAB_EXERCISE },
    ]);

    const renderScene = SceneMap({
        [TAB_DISC]: (props) => {
            return (
                <TabDisc {...props} trackData={trackData}/>
            )
        },
        [TAB_TRANSCRIPT]: (props) => {
            return (
                <TabTranscript {...props} trackData={trackData} role={role}/>
            )
        },
        [TAB_EXERCISE]: (props) => {
            return (
                <TabExercise {...props} trackData={trackData}/>
            )
        },
    });
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.tabBarIndicatorStyle}
            style={styles.tabBar}
            renderIcon={({ route, focused, color }) => {
                // console.log(route)
                switch (route.key) {
                    case TAB_DISC:
                        return (
                            <IonIcon
                                name={focused ? 'disc' : 'disc-outline'}
                                color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                size={24}
                            />
                        )
                    case TAB_TRANSCRIPT:
                        return (
                            <IonIcon
                                name={focused ? 'document-text' : 'document-text-outline'}
                                color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                size={24}
                            />
                        )
                    case TAB_EXERCISE:
                        return (
                            <MaterialIcon
                                name={focused ? 'head-question' : 'head-question-outline'}
                                color={focused ? COLOR_BASIC_1 : COLOR_BASIC_2}
                                size={24}
                            />
                        )
                }
            }}
            renderLabel={({ route, focused, color }) => (
                <></>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}

export default TabContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        padding: 5,
        width: '100%',
    },
    tabBar: {
        backgroundColor: '#D0D2E1',
        shadowOpacity: 0,
        borderBottomWidth: 0,elevation:0
    },
    tabBarIndicatorStyle: {
        height: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        elevation:0
    }
})
