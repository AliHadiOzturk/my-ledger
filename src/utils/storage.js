import AsyncStorage from "@react-native-async-storage/async-storage";

const keys = {
    config: 'config',
    language: 'language',
    workperiods: 'workperiods',
}
const storage = {
    set: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            return null;
            // saving error  
        }
    },
    get: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue !== null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            return null;
            // error reading value  
        }
    }
}
export {
    storage as Storage,
    keys as StoreKeys
};

