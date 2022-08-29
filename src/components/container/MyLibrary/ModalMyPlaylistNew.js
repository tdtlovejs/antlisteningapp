import React, {useContext, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Input from '../../../themes/Input';
import {COLOR_BASIC_1, COLOR_GREEN, COLOR_MODAL, COLOR_WHITE} from '../../../utils/colors';
import {insertMyGroup} from '../../../databases/db';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from "react-i18next";
import {MyGroupContext} from "./contexts/MyGroupContext";
const ModalMyGroupNew = (props) => {
    const {
        getMyGroups
    } = useContext(MyGroupContext);
    const {
        group,
        onClose,
    } = props;
    const {t} = useTranslation();
    const [name, setName] = useState(group ? group.name : "");

    const onSave = () => {
        if (name.trim() !== "") {
            insertMyGroup({
                name: name,
            })
                .then(res => {
                    getMyGroups();
                    onClose();
                })
                .catch(err => {

                })
        }
    }


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                onClose();
            }}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modalMyGroupNew}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => {
                            onClose();
                        }}
                    >
                        <IonIcon
                            name="close"
                            size={24}
                            color={COLOR_BASIC_1}
                        />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.newGroupText}>
                            {t('myGroup.newGroup')}
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <Input
                            placeholder={t('myGroup.groupName')}
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                            }}
                            autoFocus={true}
                            onSubmitEditing={() => {
                                onSave();
                            }}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={() => {
                                onSave()
                            }}
                        >
                            <IonIcon
                                name="save"
                                size={24}
                                color={COLOR_WHITE}
                            />
                            <Text style={styles.saveBtnText}>
                                {t('myGroup.save')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalMyGroupNew;

const styles = StyleSheet.create({
    modalWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLOR_MODAL,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalMyGroupNew: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLOR_WHITE,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
    },
    closeBtn: {
        position: "absolute",
        right: 5,
        top: 5,
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
        paddingBottom: 20,
    },
    newGroupText: {
        fontWeight: '600',
        color: COLOR_BASIC_1,
        fontSize: 15,
    },
    body: {
        paddingVertical: 5,
        width: '100%',
    },
    footer: {
        alignItems: 'flex-end',
        width: '100%',
        paddingVertical: 5,
    },
    saveBtn: {
        backgroundColor: COLOR_GREEN,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    saveBtnText: {
        color: COLOR_WHITE,
        fontWeight: '600',
        paddingLeft: 5
    }
})
