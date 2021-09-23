import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/Colors';

function ProductCard({ index, title, description, price, image }) {
    const backColors = [
        "#d50e64",
        "#85bfff",
        "#f7ca6f",
        "#239D75",
    ]

    return (
        <View key={index} style={{ flexDirection: "row", width: "100%", height: RFPercentage(10) }} >
            <View style={{ height: RFPercentage(10), width: "30%", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: backColors[index % backColors.length], alignItems: "center", justifyContent: "center" }} >
                <Text style={{ color: colors.white, fontSize: RFPercentage(2.2), fontWeight: "bold" }} >{title}</Text>
            </View>
            <View style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8, width: "70%", borderWidth: 0.9, borderColor: backColors[index % backColors.length], justifyContent: "center", alignItems: "flex-start", paddingLeft: RFPercentage(1.5) }} >
                <Text numberOfLines={1} style={{ color: colors.primary, fontSize: RFPercentage(2.5) }} >{price}</Text>
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.3) }} >{description}</Text>
            </View>
        </View>
    );
}


export default ProductCard;