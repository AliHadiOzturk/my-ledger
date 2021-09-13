
import I18n from "i18n-js";
import React, { useContext, useEffect, useState } from "react";
import { DevSettings } from "react-native";
import { Config } from ".";
import { darkTheme, theme } from "../styles";
import { themeConst } from "../styles/theme";
import { Storage, StoreKeys } from "../utils/storage";
import { pipe } from './../utils/pipe';


const ConfigContext = React.createContext();



const language = () => {
    return I18n.defaultLocale;
}

const ConfigProvider = ({ children }) => {
    const [configState, setConfigState] = useState();

    function setState(state) {
        Storage.set(StoreKeys.config, state).then(() => {
            // setGlobal(state)
            setConfigState(state)
        });
    }


    const setLanguage = (language) => {
        I18n.locale = language;
        I18n.defaultLocale = language;
        setState({
            ...configState,
            language
        });
        DevSettings.reload();
    }

    const setTheme = (theme) => {
        setState({
            ...configState,
            theme
        });
    }
    const changeTheme = () => {
        const theme = configState.theme.dark ? { ...themeConst } : { ...darkTheme };
        setState({ ...configState, theme: { ...theme } });
    }

    useEffect(() => {
        Storage.get(StoreKeys.config).then(config => { setConfigState(config || Config) }).catch(err => { console.log(err) });
    }, []);


    return (
        <ConfigContext.Provider value={{ ...configState, setLanguage, setTheme, changeTheme }}>
            {children}
        </ConfigContext.Provider>
    )


}

export { ConfigContext, ConfigProvider };

