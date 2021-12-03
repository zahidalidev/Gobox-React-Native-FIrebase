import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../config/Colors';

function RestaurentCard({ index, title, image }) {
    return (
        <View key={index} style={{ borderRadius: 20, backgroundColor: Colors.white, flex: 1, width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }} >
            <Image resizeMode="cover" source={{ uri: image }} style={{ borderRadius: 15, width: "100%", height: "80%", alignItems: 'center', justifyContent: 'center' }} />
            <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.4), marginTop: RFPercentage(0.6) }} >{title}</Text>
        </View>
    );
}


export default RestaurentCard;