import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
    DARK_1,
    DARK_2,
    LIGHT_1,
    LIGHT_2,
} from '../../utils/colors';
import Loading from '../../themes/Loading';
const ROLE_A = 'A';
const ROLE_B = 'B';
const TranscriptSentences = (props) => {
    const {
        sentences,
        role
    } = props;

    const getAvatar = (roleIndex) => {
        switch (roleIndex) {
            case 1:
                return require("../../assets/images/avatar/1.png")
            case 2:
                return require("../../assets/images/avatar/2.png")
            case 3:
                return require("../../assets/images/avatar/3.png")
            case 4:
                return require("../../assets/images/avatar/4.png")
            case 5:
                return require("../../assets/images/avatar/5.png")
            case 6:
                return require("../../assets/images/avatar/6.png")
            case 7:
                return require("../../assets/images/avatar/7.png")
            case 8:
                return require("../../assets/images/avatar/8.png")
            case 9:
                return require("../../assets/images/avatar/9.png")
            case 10:
                return require("../../assets/images/avatar/10.png")
            case 11:
                return require("../../assets/images/avatar/11.png")
            case 12:
                return require("../../assets/images/avatar/12.png")
            case 13:
                return require("../../assets/images/avatar/13.png")
            case 14:
                return require("../../assets/images/avatar/14.png")
            case 15:
                return require("../../assets/images/avatar/15.png")
            case 16:
                return require("../../assets/images/avatar/16.png")
            case 17:
                return require("../../assets/images/avatar/17.png")
            case 18:
                return require("../../assets/images/avatar/18.png")
            case 19:
                return require("../../assets/images/avatar/19.png")
            case 20:
                return require("../../assets/images/avatar/20.png")
        }
    }
    console.log(role)
    return (
        <View
            style={styles.container}
        >
            {
                (role && role.roleA && role.roleB)
                    ?
                    <FlatList
                        style={styles.content}
                        data={sentences}
                        renderItem={({item,index}) => {
                            if (item.role === ROLE_A) {
                                return (
                                    <View style={styles.sentenceItem}>
                                        <Image
                                            source={getAvatar(role.roleA)}
                                            style={styles.avatarImage}
                                        />
                                        <View style={styles.sentencesContentWrapper}>
                                            <View style={[
                                                styles.sentencesContent,
                                            ]}>
                                                <Text style={styles.sentenceText}>
                                                    {item.sentence}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={[styles.sentenceItem, styles.sentenceItemRight]}>
                                        <View style={[styles.sentencesContentWrapper, styles.sentencesContentWrapperRight]}>
                                            <View style={[
                                                styles.sentencesContent,
                                                styles.sentencesContentRight,
                                            ]}>
                                                <Text style={[styles.sentenceText, styles.sentenceTextRight]}>
                                                    {item.sentence}
                                                </Text>
                                            </View>
                                        </View>
                                        <Image
                                            source={getAvatar(role.roleB)}
                                            style={styles.avatarImage}
                                        />
                                    </View>
                                )
                            }
                        }}
                    />
                    :
                    <ScrollView>
                        <Loading />
                    </ScrollView>
            }
        </View>
    )
}

export default TranscriptSentences;
const styles = StyleSheet.create({
    header: {
        // height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    content: {
    },
    sentenceItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '100%',
    },
    sentenceItemRight: {
        justifyContent: 'flex-end'
    },
    avatarImage: {
        height: 36,
        width: 36,
    },
    sentencesContentWrapper: {
        flex: 1,
        alignItems: 'flex-start'
    },
    sentencesContentWrapperRight: {
        alignItems: 'flex-end'
    },
    sentencesContent: {
        backgroundColor: LIGHT_2,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderTopLeftRadius: 0,
    },
    sentencesContentDark: {
        backgroundColor: LIGHT_2
    },
    sentencesContentRight: {
        backgroundColor: DARK_2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 0,
    },
    sentencesContentRightDark: {
        backgroundColor: DARK_2
    },
    sentenceText: {
        color: DARK_1,
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.4
    },
    sentenceTextRight: {
        color: LIGHT_1
    }
})
