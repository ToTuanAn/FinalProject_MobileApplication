import React, {PropsWithChildren} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientButton = ({style, onPress, children}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#9F21FD', '#01ab9d']}
                style={gradientButtonStyle.linearGradient}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const gradientButtonStyle = StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
});
