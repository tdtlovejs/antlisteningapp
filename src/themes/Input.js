import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLOR_BASIC_1, COLOR_BASIC_2, COLOR_BASIC_2_OPACITY,} from '../utils/colors';

const Input = (props) => {
    const {
        style,
        editable,
    } = props;
    return (
        <TextInput
            placeholderTextColor={COLOR_BASIC_2}
            {...props}
            style={[styles.input, style]}
            editable={editable === undefined ? true : editable}
        />
    )
}

export default Input;

const styles = StyleSheet.create({
    input: {
        color: COLOR_BASIC_1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_BASIC_2
    },
})
