import { useNavigation } from "@react-navigation/core";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useContext } from 'react';
import { ConfigContext } from '../../config/index'

export const setting = ({ children, text, icon, navigateTo, screen = "Settings", onPressCallBack, disableTouch }) => {

    const navigation = useNavigation();

    const { colors } = useTheme();

    const configCtx = useContext(ConfigContext);
    const onPress = () => navigateTo ? navigate() : onPressCallBack && onPressCallBack();

    const navigate = () => {
        if (navigateTo)
            navigation.navigate(screen, navigateTo);

    }
    return (
        <>
            <TouchableOpacity style={styles.container} onPress={onPress} disabled={disableTouch}>
                <Surface style={styles.surface}>
                    {/* <Surface style={styles.icon}> */}
                    <Icon name={icon} size={32} color={colors.text} />
                    <Text style={styles.text}>{text}</Text>
                </Surface>
                {
                    children ? children : <Icon name="chevron-forward-outline" size={20} style={styles.icon} color={colors.text} />
                }
            </TouchableOpacity>
            <Divider />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
    },
    surface: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        paddingLeft: 10
    },
    icon: {
        // paddingLeft: 10
        width: 30,
        height: 30
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center'
    }

})