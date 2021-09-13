import React, { useState } from 'react';
import { List, RadioButton, Surface, Switch, Text, withTheme } from 'react-native-paper';
import { Setting } from '../components/settings';
import { translate } from '../localization';
import { useContext } from 'react';
import { ConfigContext } from '../config';
import { FlatList, StyleSheet, View } from 'react-native';
import I18n from 'i18n-js';
import { CustomDialog } from '../components';


const languages = [
    { name: 'English', code: 'en' },
    { name: 'Türkçe', code: 'tr' },
]

const Settings = () => {
    const config = useContext(ConfigContext);

    const [languageDialogVisible, setLanguageDialogVisible] = useState(false);

    const getText = () => {
        const text = translate(config?.theme?.dark ? 'theme.dark' : 'theme.ligth') + " " + translate("setting.theme");
        return text;
    }
    return (
        <>
            <View style={styles.view}>
                <Setting icon="color-palette-outline"
                    text={getText()}
                    disableTouch>
                    <Switch value={config?.theme?.dark} onValueChange={() => config.changeTheme()} />
                </Setting>
                <Setting icon="language-outline"
                    text={translate("setting.language")}
                    onPressCallBack={() => setLanguageDialogVisible(!languageDialogVisible)}>
                    <Text style={styles.text}>{I18n.locale.toUpperCase()}</Text>
                </Setting>

            </View>

            <CustomDialog title={translate('setting.language')}
                visible={languageDialogVisible}
                onDismiss={() => setLanguageDialogVisible(false)}>
                <View>
                    {languages.map(language => {
                        return (
                            <List.Item key={language.code}
                                right={(props) => <RadioButton value={language.code}
                                    status={I18n.locale === language.code ? 'checked' : 'unchecked'}>
                                </RadioButton>}
                                title={language.name}
                                onPress={() => config.setLanguage(language.code)} />
                        )
                    })}
                </View>
            </CustomDialog>
        </>
    )
}
const styles = StyleSheet.create(
    {
        view: {
            flex: 1
        },
        text: {
            paddingRight: 15,
            fontWeight: 'bold',
        }
    }
)


export default withTheme(Settings);