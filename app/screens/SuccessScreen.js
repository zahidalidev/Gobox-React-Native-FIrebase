import React, { useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import Screen from "../components/Screen.js";

// config
import Colors from "../config/Colors";

// images
import logo from "../../assets/images/logo.png"

function SuccessScreen(props) {

    const data = {
        id: 0,
        subHeading: 'Thank you for your order, will be at your home at 20:30',
    }

    return (
        <Screen style={{ backgroundColor: Colors.white }} >
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

            <View style={{ flex: 1, width: "100%", justifyContent: 'space-evenly', alignItems: "center", height: "90%", backgroundColor: Colors.primary, borderBottomEndRadius: RFPercentage(2.5), borderBottomStartRadius: RFPercentage(2.5) }} >
                <View style={{ height: "10%", width: "100%", justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ width: "80%", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(3) }} >
                        <Text style={{ letterSpacing: 0.8, marginTop: RFPercentage(1.5), fontSize: RFPercentage(3), color: Colors.white, width: "80%", textAlign: "center" }} >{data.subHeading}</Text>
                    </View>
                </View>
                <View style={{ height: "20%", width: "100%", justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(-5) }} >
                    <View>
                        <Image source={logo} />
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen")} style={{ height: "10%", backgroundColor: Colors.white, justifyContent: "center", alignItems: 'center' }} >
                <Text style={{ marginBottom: RFPercentage(2), color: Colors.primary, fontSize: RFPercentage(3) }} >back to the home</Text>
            </TouchableOpacity>
        </Screen>
    );
}


export default SuccessScreen;