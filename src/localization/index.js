import { LocalizationContext, LocalizationProvider } from './provider'
import I18n from 'i18n-js';


const translate = (text) => {
    return I18n.translate(text, I18n.locale);
}

export {
    LocalizationProvider,
    LocalizationContext,
    translate
}