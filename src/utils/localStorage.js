import {AsyncStorage} from 'react-native';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@LocalStore:${key}`, value);
        console.log('Save data to local, ', value);
    } catch (error) {
        console.log('Save data from local failed');
    }
};

export const retrieveData = async key => {
    try {
        const value = await AsyncStorage.getItem(`@LocalStore:${key}`);
        if (value !== null) {
            console.log('Get data from local, ', value);
            return value;
        }
    } catch (error) {
        console.log('Get data from local failed');
        throw 'Error';
    }
};
