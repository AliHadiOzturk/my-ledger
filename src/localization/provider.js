import I18n from "i18n-js"
import React, { useEffect, useState } from "react"
import { Storage, StoreKeys } from "../utils/storage";
import * as RNLocalize from "react-native-localize";

import en from "./translations/en"
import tr from "./translations/tr"

I18n.fallbacks = true;
I18n.missingTranslation = function () { return undefined }
I18n.locales.no = 'en';
I18n.fallbacks = true
I18n.translations = {
    en,
    tr
}

const LocalizationContext = React.createContext(null);

const LocalizationProvider = ({ children }) => {
    const [locale, setLocale] = useState(I18n.currentLocale());
    useEffect(() => {
        Storage.get(StoreKeys.config).then(config => {
            if (config === null && !config?.language) {
                const locales = RNLocalize.getLocales();
                I18n.locale = locales[0].languageCode;
                I18n.defaultLocale = locales[0].languageCode;
                Storage.set(StoreKeys.config, { ...config, language: locales[0].languageCode });
            }
            else {
                I18n.locale = config.language;
                I18n.defaultLocale = config.language;
            }
        })
    }, [])
    return (
        <LocalizationContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export { LocalizationContext, LocalizationProvider }
