import React, { useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import Screen from "../components/Screen.js";

// config
import Colors from "../config/Colors";

// images
import logo from "../../assets/images/logo.png"
import suss from "../../assets/images/suss.png"
import clock from "../../assets/images/clock.png"

function SplashScreen(props) {

    const [currentSplashIndex, setCurrentSplashIndex] = useState(0)

    const data = [
        {
            id: 0,
            subHeading: 'Coonsegna puntuale a domicilio ',
        },
        {
            id: 1,
            image: clock,
            subHeading: 'Indicaci indirizzo, nome e orario',
        },
        {
            id: 2,
            image: suss,
            subHeading: 'Conferma la richiesta',
        }
    ]

    const handleNext = () => {
        if (currentSplashIndex < 2) {
            setCurrentSplashIndex(currentSplashIndex + 1);
        } else {
            props.navigation.navigate("HomeScreen")
        }
    }

    return (
        <Screen style={{ backgroundColor: Colors.white }} >
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

            <View style={{ flex: 1, width: "100%", justifyContent: 'space-evenly', alignItems: "center", height: "90%", backgroundColor: Colors.primary, borderBottomEndRadius: RFPercentage(2.5), borderBottomStartRadius: RFPercentage(2.5) }} >
                <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen")} style={{ position: "absolute", top: RFPercentage(4), right: RFPercentage(4) }} >
                    <Text style={{ fontSize: RFPercentage(2.5), color: Colors.white }} >
                        Skip
                    </Text>
                </TouchableOpacity>

                <View style={{ height: "20%", width: "100%", justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(-5) }} >
                    <View>
                        <Image source={logo} />
                    </View>
                </View>

                {data[currentSplashIndex].image &&
                    <View style={{ height: "20%", width: "100%", justifyContent: 'center', alignItems: 'center' }} >
                        <View>
                            <Image style={{ width: RFPercentage(20), height: RFPercentage(20) }} source={data[currentSplashIndex].image} />
                        </View>
                    </View>
                }

                <View style={{ height: "10%", width: "100%", justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(3) }} >
                        <Text style={{ letterSpacing: 0.8, marginTop: RFPercentage(1.5), fontSize: RFPercentage(2.2), color: Colors.white, width: "80%", textAlign: "center" }} >{data[currentSplashIndex].subHeading}</Text>
                    </View>
                </View>

                <View style={{ position: "absolute", bottom: RFPercentage(3), flexDirection: "row" }} >
                    <View style={{ backgroundColor: currentSplashIndex === 0 ? Colors.white : Colors.grey, width: currentSplashIndex === 0 ? RFPercentage(3.8) : RFPercentage(1), height: RFPercentage(1), borderRadius: RFPercentage(4) }} ></View>
                    <View style={{ marginLeft: RFPercentage(1), backgroundColor: currentSplashIndex === 1 ? Colors.white : Colors.grey, width: currentSplashIndex === 1 ? RFPercentage(3.8) : RFPercentage(1), height: RFPercentage(1), borderRadius: RFPercentage(4) }} ></View>
                    <View style={{ marginLeft: RFPercentage(1), backgroundColor: currentSplashIndex === 2 ? Colors.white : Colors.grey, width: currentSplashIndex === 2 ? RFPercentage(3.8) : RFPercentage(1), height: RFPercentage(1), borderRadius: RFPercentage(4) }} ></View>
                </View>
            </View>

            <TouchableOpacity onPress={() => handleNext()} style={{ height: "10%", backgroundColor: Colors.white, justifyContent: "center", alignItems: 'center' }} >
                <Text style={{ marginBottom: RFPercentage(2), color: Colors.primary, fontSize: RFPercentage(3) }} >Next</Text>
            </TouchableOpacity>
        </Screen>
    );
}


export default SplashScreen;