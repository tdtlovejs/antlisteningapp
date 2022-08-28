import {Image, Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    COLOR_BASIC_1,
    COLOR_BASIC_1_OPACITY,
    COLOR_BASIC_2_OPACITY,
    COLOR_WHITE
} from '../utils/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SwitchCustom = (props) => {
    const {
        listOptions,
        optionValueInit,
        onChange,
        conditionCanNotChange,
        valueCanNotChange,
        handleCanNotChange
    } = props;
    const [optionValue, setOptionValue] = useState(optionValueInit);

    useEffect(() => {
        if (optionValue !== optionValueInit) {
            onChange(optionValue)
        }
    }, [optionValue])

    return (
        <TouchableOpacity style={styles.switchMode}>
            {
                listOptions.map((itemOption, index) => {
                    return (
                        <Pressable
                            style={[
                                styles.optionMode,
                                (optionValue === itemOption.value ? styles.optionModeActive : {})
                            ]}
                            key={index}
                            onPress={() => {
                                if (optionValue !== itemOption.value) {
                                    if (conditionCanNotChange && valueCanNotChange === itemOption.value) {
                                        if (typeof handleCanNotChange === 'function') {
                                            handleCanNotChange()
                                        }
                                    } else {
                                        setOptionValue(itemOption.value)
                                    }
                                }
                            }}
                        >
                            {
                                itemOption.hasOwnProperty('label') && <Text
                                    style={[
                                        styles.optionModeText,
                                        (optionValue === itemOption.value ? styles.optionModeTextActive : {})
                                    ]}
                                >
                                    {itemOption.label}
                                </Text>

                            }
                            {
                                itemOption.hasOwnProperty('icon') && <IonIcon
                                    name={itemOption.icon}
                                    size={18}
                                    color={optionValue === itemOption.value ? COLOR_WHITE : COLOR_BASIC_1}
                                />
                            }
                            {
                                itemOption.hasOwnProperty('image') &&  <Image
                                    source={itemOption.image}
                                    style={styles.image}
                                />
                            }
                        </Pressable>
                    )
                })
            }

        </TouchableOpacity>
    )
}

export default SwitchCustom;
const styles = StyleSheet.create({
    switchMode: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLOR_BASIC_1_OPACITY(0.4),
        backgroundColor: COLOR_BASIC_2_OPACITY(0.4),
        borderRadius: 21,
    },
    optionMode: {
        width: 'auto',
        borderRadius: 21,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    optionModeActive: {
        backgroundColor: COLOR_BASIC_1_OPACITY(0.4),
    },
    optionModeText: {
        textAlign: 'center',
        color: COLOR_BASIC_1,
        fontWeight: '500'
    },
    optionModeTextActive: {
        color: COLOR_WHITE,
    },
    image: {
        height: 18,
        width: 18,
    }
})
