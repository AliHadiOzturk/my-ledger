
import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { ConfigContext } from "../config";
import moment from "moment";

export const TimeElapsed = ({ startTime, textStyle }) => {
    const config = useContext(ConfigContext);
    const [time, setTime] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log(new Date().getTimezoneOffset())
            // const d = moment(startTime).diff(moment(new Date()))
            // console.log(d.toString());
            // setTime(d);
            // var date1 = new Date(startTime);
            // var date2 = new Date();
            // var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            // const date = new Date(timeDiff);
            // // console.log(date.getHours());
            // // console.log(timeDiff);
            // // console.log(date1.toString());
            // // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            // // console.log(new Date(timeDiff).getMinutes());
            // setTime(date);
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    return (
        <>
            <View style={styles.container} >
                {/* <Text style={textStyle}>{time?.getDay()}/{time?.getMonth()}</Text> */}
                <Text style={textStyle}>{time}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})