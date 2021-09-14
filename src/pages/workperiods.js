import React, { useEffect, useLayoutEffect, useState } from "react";
import { List, useTheme } from "react-native-paper";
import { Transactions, WorkPeriodComponent } from "../components";
import { Storage, StoreKeys } from "../utils/storage";
import Icon from "react-native-vector-icons/Ionicons";

export const WorkPeriods = (props) => {
    const { colors, dark } = useTheme();
    const [workPeriods, setWorkPeriods] = useState();
    useEffect(() => {
        Storage.get(StoreKeys.workperiods).then(periods => {
            setWorkPeriods(periods.sort((a, b) => b.endTime > a.endTime));
        });
    }, [])
    // useLayoutEffect(() => {
    //     props.navigation.setOptions({
    //         headerRight: () => (
    //             <Icon name="close-outline" color={colors.text} size={20}></Icon>
    //         ),
    //     });
    // }, []);

    return (
        <>
            {
                workPeriods && workPeriods.map((workPeriod, idx) => {
                    return (
                        <List.Accordion
                            key={idx}
                            style={{ backgroundColor: colors.disabled }}
                            title={
                                <WorkPeriodComponent workPeriod={workPeriod}></WorkPeriodComponent>
                            }>
                            <Transactions workPeriod={workPeriod}></Transactions>
                        </List.Accordion>
                    )
                })
            }
        </>
    )
}