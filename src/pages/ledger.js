import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, ToggleButton, Switch, Text, Title, Paragraph, List, Menu, Divider, useTheme } from 'react-native-paper';
import { Transaction, TransactionType, WorkPeriod, WorkPeriodStatus } from '../models';
import { translate } from '../localization'
import Icon from 'react-native-vector-icons/Ionicons'
import { Storage, StoreKeys } from '../utils/storage';
import { TimeElapsed, Transactions } from '../components';

export default Ledger = ({ navigation }) => {


    const { colors } = useTheme();
    const [workPeriod, setWorkPeriod] = useState();

    const [transaction, setTransaction] = useState();

    const addTransaction = () => {
        Storage.get(StoreKeys.workperiods).then(periods => {
            let idx = periods.findIndex(x => x.id === workPeriod.id);
            if (idx !== -1) {
                const wp = { ...workPeriod, transactions: [...workPeriod.transactions, transaction] };
                periods[idx] = wp;
                Storage.set(StoreKeys.workperiods, periods);
                setWorkPeriod(wp);
                console.log(workPeriod);
                setTransaction(new Transaction());
            }
        })
    }

    const handlePlayPausePress = () => {
        console.log('workPeriod', JSON.stringify(workPeriod));
        if (workPeriod) {
            workPeriod.status = WorkPeriodStatus.ENDED;
            workPeriod.endTime = new Date();
            Storage.get(StoreKeys.workperiods).then(workPeriods => {
                const idx = workPeriods.findIndex(wp => wp.id === workPeriod.id);
                if (idx !== -1) {
                    workPeriods[idx] = workPeriod;
                    Storage.set(StoreKeys.workperiods, [...workPeriods]);
                }
                setWorkPeriod(null);
            })
        }
        else {
            const wp = new WorkPeriod();
            wp.startTime = new Date();
            wp.date = new Date();
            console.log(wp)
            Storage.get(StoreKeys.workperiods).then(workPeriods => {
                Storage.set(StoreKeys.workperiods, [...workPeriods, wp]);
            })
            setWorkPeriod(wp);
        }
    }


    const handleListPress = () => {
        navigation.navigate('WorkPeriods');
    }

    useEffect(() => {
        setTransaction(new Transaction());
        Storage.get(StoreKeys.workperiods).then(data => {
            console.log('data', JSON.stringify(data));
            if (data && data.length > 0) {
                const workPeriods = data?.filter(x => x.status === WorkPeriodStatus.STARTED);
                if (data !== null && workPeriods && workPeriods?.length !== 0)
                    setWorkPeriod(workPeriods[0]);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            {/* <View style={styles.interaction}> */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'flex-end', justifyContent: 'space-between', marginTop: 10 }}>
                {/* {workPeriod && workPeriod.startTime && <TimeElapsed startTime={workPeriod.startTime} />} */}
                <Icon name='list-outline'
                    style={{ marginLeft: 10 }}
                    color={colors.text}
                    onPress={handleListPress}
                    size={30} />
                <Icon style={{ alignSelf: 'flex-end', marginLeft: 10, marginRight: 10 }}
                    name={workPeriod ? 'pause-circle' : 'play'}
                    size={30}
                    color={workPeriod ? '#ff0000' : '#3dd417'}
                    onPress={handlePlayPausePress} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput}
                    label={translate('model.transaction.price')}
                    value={transaction?.priceStr}
                    right={<TextInput.Affix text="₺" />}
                    keyboardType='numeric'
                    onChangeText={text => setTransaction({ ...transaction, price: Number(text), priceStr: text })}
                />
                <TextInput style={styles.textInput}
                    label={translate('model.transaction.description')}
                    value={transaction?.description}
                    multiline
                    onChangeText={text => setTransaction({ ...transaction, description: text })}
                />

            </View>
            {/* </View> */}
            <Divider />
            <View style={styles.actionContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Switch style={styles.switch}
                        value={transaction?.type === TransactionType?.INCOME ? true : false}
                        onValueChange={() => setTransaction({ ...transaction, type: transaction?.type === TransactionType.INCOME ? TransactionType.OUTCOME : TransactionType.INCOME })} />
                    <Paragraph>{transaction?.type === TransactionType.INCOME ? translate('model.transactiontype.income') : translate('model.transactiontype.expense')}</Paragraph>
                </View>
                <Button disabled={workPeriod ? false : true} mode="contained"
                    onPress={addTransaction}>
                    {translate('action.save')}
                </Button>

            </View>
            <Transactions workPeriod={workPeriod} rigth></Transactions>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    interaction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 0,
        flexDirection: 'column',
    },
    textInput: {
        margin: 0
    },
    switch: {
        alignSelf: 'flex-start',
        marginLeft: 0
    },
    actionContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 10
    },
    list: {
        flex: 1,
        flexDirection: 'column',
    }
})