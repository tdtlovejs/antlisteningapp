import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLOR_BASIC_1} from "../utils/colors";

const CheckboxCustom = (props) => {
    const {
        checkInit,
        onChange
    } = props;
    const [check, setCheck] = useState(checkInit);

    useEffect(() => {
        if (check !== checkInit) {
            onChange(check)
        }
    }, [check])

    return (
        <TouchableOpacity onPress={() => {
            setCheck(prev => !prev)
        }}>
            <IonIcon
                name={check ? 'ios-checkbox-outline' : 'square-outline'}
                size={24}
                color={COLOR_BASIC_1}
            />
        </TouchableOpacity>
    )
}

export default CheckboxCustom;
const styles = StyleSheet.create({

})
