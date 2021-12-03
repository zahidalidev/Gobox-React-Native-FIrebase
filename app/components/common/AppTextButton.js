import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Button } from 'react-native-paper';

function AppTextButton({ facebook = false, google = false, disabled = false, name, onSubmit, width, height = RFPercentage(6), borderRadius = RFPercentage(1.2), backgroundColor = "black", buttonStyle, textStyle }) {
    return (
        <TouchableOpacity onPress={() => onSubmit()} style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2, backgroundColor, width, flexDirection: "row", height, borderRadius: borderRadius, justifyContent: "center", ...buttonStyle, alignItems: "center"
        }} >
            <Text numberOfLines={1} style={{ color: "white", fontSize: RFPercentage(2.2), ...textStyle }} >{name}</Text>
        </TouchableOpacity >
    );
}

export default AppTextButton;