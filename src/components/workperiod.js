import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { DateHelper } from './../utils/helpers/dateHelper';
import { WorkPeriodStatus } from './../models/workperiod';
import { translate } from '../localization';
export const WorkPeriod = ({ workPeriod }) => {

    const { startTime, endTime } = workPeriod;
    console.log("starttime => ", startTime)
    return (
        <>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>{translate('model.transaction.startTime')}: </Text><Text>{DateHelper.formatDateTR(startTime)}</Text>
                </View>
                {workPeriod.status !== WorkPeriodStatus.STARTED && <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>{translate('model.transaction.endTime')}: </Text><Text>{DateHelper.formatDateTR(endTime)}</Text>
                </View>
                }

            </View>
        </>
    )
}