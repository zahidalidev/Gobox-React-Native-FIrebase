import React from 'react';
import { View, Text, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/Colors';

function ProductCard({ index, title, description, price, image }) {
    return (
        <View key={index} style={{ flexDirection: "column", width: "100%", flex: 1 }} >
            <View style={{ marginTop: 4 }} >
                <View style={{ flexDirection: "row" }} >
                    <Text numberOfLines={1} style={{ color: colors.secondary, fontSize: RFPercentage(2), marginRight: RFPercentage(0.5) }} >{price}</Text>
                    <Text numberOfLines={1} style={{ width: "80%", color: colors.black, fontSize: RFPercentage(2) }} >{title}</Text>
                </View>
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(1.8) }} >{description}</Text>
            </View>
        </View>
    );
}


export default ProductCard;