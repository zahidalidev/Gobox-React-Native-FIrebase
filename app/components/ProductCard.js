import React from 'react';
import { View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../config/Colors';

function ProductCard({ index, title, description, price, order = false, name = "", address = "", number = '', totalPrice = '', quantity = 1 }) {
    const backColors = [
        "#d50e64",
        "#85bfff",
        "#f7ca6f",
        "#239D75",
    ]

    return (
        <View key={index} style={{ flexDirection: "row", width: "100%", height: order ? RFPercentage(18) : RFPercentage(10) }} >
            <View style={{ height: order ? RFPercentage(18) : RFPercentage(10), width: "30%", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: backColors[index % backColors.length], alignItems: "center", justifyContent: "center" }} >
                <Text style={{ color: colors.white, fontSize: RFPercentage(2.2), fontWeight: "bold" }} >{title}</Text>
            </View>
            <View style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8, width: "70%", borderWidth: 0.9, borderColor: backColors[index % backColors.length], justifyContent: "center", alignItems: "flex-start", paddingLeft: RFPercentage(1.5) }} >
                {
                    !order ?
                        <Text numberOfLines={1} style={{ color: colors.primary, fontSize: RFPercentage(2.5) }} >{price}</Text>
                        : null
                }
                <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.3) }} >{description}</Text>
                {
                    order ? <View >
                        <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.5) }} >Customer Name: {name}</Text>
                        <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.3) }} >{number}</Text>
                        <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.3) }} >{address}</Text>
                        <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.3) }} >Quantity {quantity}</Text>
                        <Text numberOfLines={1} style={{ color: colors.grey, fontSize: RFPercentage(2.3), fontWeight: "bold" }} >Total {totalPrice}</Text>
                    </View> : null
                }
            </View>
        </View >
    );
}


export default ProductCard;