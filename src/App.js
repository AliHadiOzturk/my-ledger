import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Config, ConfigContext, ConfigProvider } from './config';
import { HomePage, Ledger, SettingsPage, WorkPeriods } from './pages';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { theme } from './styles/index';
import { LocalizationProvider, translate } from './localization';
import { Storage, StoreKeys } from './utils/storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'



const LedgerStack = createNativeStackNavigator();
const LedgerStackScreen = () => {
  const config = useContext(ConfigContext);
  return (
    <LedgerStack.Navigator initialRouteName="Ledger"
      theme={config.theme}>
      <LedgerStack.Screen
        name="Ledger"
        component={Ledger}
        options={{ headerShown: false }}
      />
      <LedgerStack.Screen
        options={{
          presentation: 'modal',
          headerShown: true,
          headerStyle: { backgroundColor: config.theme.colors.background },
          title: translate("pages.workperiods"),
        }}
        name="WorkPeriods"
        component={WorkPeriods}>
      </LedgerStack.Screen>
    </LedgerStack.Navigator>
  );
}


const Tab = createMaterialBottomTabNavigator();
const App = () => {

  useEffect(() => {
    Storage.get(StoreKeys.workperiods).then(wp => {
      if (wp === null || wp.length === 0) {
        Storage.set(StoreKeys.workperiods, []);
      }
    })
  }, [])
  return (
    <>
      <ConfigProvider>
        <Main></Main>
      </ConfigProvider >
    </>
  );
};

const Main = () => {
  const config = useContext(ConfigContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <LocalizationProvider>
      <PaperProvider theme={config?.theme}>
        <NavigationContainer theme={config?.theme}>
          <Tab.Navigator initialRouteName="Settings"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'LedgerRoot') {
                  iconName = focused
                    ? 'book-outline'
                    : 'book';
                }
                else if (route.name === 'Settings') {
                  iconName = focused ? 'cog' : 'cog-outline';
                }
                // else if (route.name === 'Products') {
                //   iconName = focused ? 'cog' : 'cog-outline';
                // }
                return <Icon name={iconName} size={20} color={color} />;
              }
            })}
          >
            <Tab.Screen name="LedgerRoot" options={{ tabBarLabel: translate("tab.ledger") }} component={LedgerStackScreen} />
            <Tab.Screen name="Settings" options={{ tabBarLabel: translate("tab.setting") }} component={SettingsPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </LocalizationProvider>
  )
}

export default App;
