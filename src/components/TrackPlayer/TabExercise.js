import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
    ACTIVE_1,
    COLOR_BASIC_1,
    COLOR_BASIC_1_OPACITY,
    COLOR_BASIC_2,
    COLOR_BASIC_2_OPACITY,
    COLOR_GREEN, COLOR_RED,
} from '../../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';


const TabExercise = (props) => {
    const {
        trackData
    } = props;
    console.log(trackData.questions);
    const [answers, setAnswers] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    const onCheck = () => {
        if (Object.keys(answers).length < trackData.questions.length) {
            Alert.alert(
                '',
                "hoan thanh tat ca cau hoi",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } else {
            setIsChecked(true)
        }
    }
    return (
        <ScrollView style={styles.container}>
            {trackData.questions.map((itemQ, indexQ) => {
                return (
                    <View style={styles.question}>
                        <Text style={styles.questionText}>
                            {itemQ.text}
                        </Text>
                        {
                            itemQ.answers.map((itemA, indexA) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.answer}
                                        onPress={() => {
                                            const answersTemp = {...answers}
                                            if (answersTemp[indexQ] === indexA) {
                                                delete answersTemp[indexQ]
                                            } else {
                                                answersTemp[indexQ] = indexA
                                            }
                                            setAnswers(answersTemp)
                                        }}
                                    >
                                        <View style={styles.answerAction}>
                                            <View style={[
                                                styles.answerActionBtn,
                                                answers[indexQ] === indexA ? styles.answerActionBtnActive : {},
                                                (isChecked && answers[indexQ] === indexA) ? indexA === itemQ.correct ? styles.answerActionBtnCorrect : styles.answerActionBtnInCorrect : {}
                                            ]}>

                                            </View>
                                        </View>
                                        <Text style={[
                                            styles.answerText,
                                            (answers[indexQ] === indexA ? styles.answerTextActive : {}),
                                            (isChecked && answers[indexQ] === indexA) ? indexA === itemQ.correct ? styles.answerTextCorrect : styles.answerTextInCorrect : {}
                                        ]}>
                                            {itemA}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                )
            })}
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.check}
                    onPress={() => {
                        onCheck()
                    }}
                >
                    <Text style={styles.checkText}>
                        check
                    </Text>
                    <Image
                        style={styles.checkImg}
                        source={require('./../../assets/images/check.png')}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default TabExercise;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    question: {
        width: '100%',
        paddingVertical: 5,
    },
    questionText: {
        color: COLOR_BASIC_1,
        fontSize: 14,
        fontWeight: '500',
    },
    answer: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    answerAction: {
        paddingHorizontal: 5,
    },
    answerActionBtn: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: COLOR_BASIC_2_OPACITY(0.4),
    },
    answerActionBtnActive: {
        backgroundColor: COLOR_BASIC_1_OPACITY(0.6)
    },
    answerActionBtnCorrect: {
        backgroundColor: COLOR_GREEN,
    },
    answerActionBtnInCorrect: {
        backgroundColor: COLOR_RED
    },
    answerText: {
        flex: 1,
        color: COLOR_BASIC_2,
        fontSize: 13,

    },
    answerTextActive: {
        color: COLOR_BASIC_1_OPACITY(0.8)
    },
    answerTextCorrect: {
        color: COLOR_GREEN,
    },
    answerTextInCorrect: {
        color: COLOR_RED
    },
    bottom: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    checkText: {
        paddingRight: 5,
        color: COLOR_BASIC_1,
        fontSize: 14,
        fontWeight: '500'
    },
    checkImg: {
        height: 18,
        width: 18
    }
})
