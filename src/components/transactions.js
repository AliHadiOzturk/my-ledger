import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, List, Menu, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { translate } from "../localization";
export const Transactions = ({ workPeriod, rigth }) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);
    console.log(workPeriod?.transactions)
    return (
        <View style={styles.list}>
            <ScrollView >
                {
                    workPeriod && workPeriod?.transactions.map((t, idx) => {
                        return (
                            <>
                                <List.Item key={idx}

                                    title={<Text>{<Text style={{ fontWeight: 'bold' }}>{translate('model.transaction.price')} : </Text>}  {t.price}  ₺</Text>}
                                    description={<Text>{<Text style={{ fontWeight: 'bold' }}>{translate('model.transaction.description')} : </Text>} {t.description}</Text>}
                                    right={() =>
                                    // <Icon
                                    //     style={{ alignSelf: 'center', marginRight: 10 }}
                                    //     name='ellipsis-horizontal'
                                    //     size={25} ></Icon>
                                    {
                                        rigth &&
                                        <Menu
                                            style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}
                                            visible={t.visible}
                                            onDismiss={() => { t.visible = false; setVisible(false) }}
                                            anchor={
                                                <Icon
                                                    style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 10, textAlign: 'center' }}
                                                    name='ellipsis-horizontal'
                                                    size={25}
                                                    color={colors.text}
                                                    onPress={() => { t.visible = true; setVisible(true) }} ></Icon>
                                            }>
                                            <Menu.Item onPress={() => { }} title={translate('action.remove')} />
                                            <Menu.Item onPress={() => { }} title={translate('action.edit')} />
                                        </Menu>
                                    }
                                    }
                                />
                                <Divider />
                            </>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
    }
})