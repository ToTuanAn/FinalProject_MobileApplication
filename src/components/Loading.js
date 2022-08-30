import React from 'react';
import {View, StyleSheet} from 'react-native';
import COLORS from '../const/colors';
import {ActivityIndicator} from 'react-native-paper';

export const Loading = () => {
    return (
        <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
            <ActivityIndicator/>
        </View>
    );
};
