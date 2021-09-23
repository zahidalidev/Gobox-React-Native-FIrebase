import React, { useEffect } from 'react';
import { useState } from 'react';
import { Image, StyleSheet, View, Dimensions, Text, Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AntDesign } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import AppTextButton from '../components/common/AppTextButton';
import AppTextInput from '../components/common/AppTextInput';

// confgi
import colors from '../config/Colors';

// services
import { orderCart } from "../services/OrderServices";
import LoadingModal from '../components/common/LoadingModal';

const height = Dimensions.get('window').height;

function CheckoutScreens(props) {
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [indicator, setIndicator] = useState(false)

    const getProduct = async () => {
        try {
            if (props.route.params != undefined) {
                const productResponce = props.route.params.item;
                setProduct(productResponce)
            }
        } catch (error) {
            console.log("product details: ", error)
        }
    }

    const getUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);
            setUser(user)
        } catch (error) {
            console.log("Getting user error: ", error)
        }
    }

    useEffect(() => {
        getProduct();
        getUser();
    }, [props.route.params])

    const handleOrder = async () => {
        setIndicator(true)
        try {
            let res = await AsyncStorage.getItem('user');
            res = JSON.parse(res);

            let orderObj = {
                title: product.title,
                price: product.price,
                description: product.description,
                email: res.email,
                totalPrice: product.price,
                name: res.name,
                address,
                number,
            }

            await orderCart(orderObj);
            setIndicator(false)
            props.navigation.navigate("SuccessScreen")
        } catch (error) {
            console.log("Order Not Completed: ", error)
            alert("Order Not Completed")
        }
        setIndicator(false)
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: (height / 4) - RFPercentage(6), backgroundColor: colors.primary }} >
                <Text style={{ color: colors.white, fontSize: RFPercentage(4), marginBottom: RFPercentage(4) }} >
                    Confirm Order
                </Text>
            </View>

            <TouchableOpacity onPress={() => props.navigation.navigate('ProductScreen')} style={{ position: "absolute", top: RFPercentage(5), right: RFPercentage(3) }} >
                <AntDesign name="close" size={RFPercentage(3)} color={colors.white} />
            </TouchableOpacity>

            <LoadingModal show={indicator} />

            <View style={{ marginTop: RFPercentage(-6), borderTopLeftRadius: RFPercentage(7), borderTopRightRadius: RFPercentage(7), flex: 1, width: "100%", backgroundColor: colors.white }} >
                <View style={{ marginTop: RFPercentage(3), flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Name
                        </Text>
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            {product.title}
                        </Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Price
                        </Text>
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            {product.price}
                        </Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Description
                        </Text>
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            {product.description}
                        </Text>
                    </View>

                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Orario
                        </Text>
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            20:30
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "30%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Indirizzo
                        </Text>
                        <AppTextInput
                            borderWidth={0.8}
                            placeHolder={"Address"}
                            height={RFPercentage(5.5)}
                            width="70%"
                            value={address}
                            onChange={(text) => setAddress(text)}
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "30%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Contact Number
                        </Text>
                        <AppTextInput
                            borderWidth={0.8}
                            height={RFPercentage(5.5)}
                            placeHolder={"Contact Number"}
                            width="70%"
                            value={number}
                            onChange={(text) => setNumber(text)}
                        />
                    </View>


                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "100%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Pago con carta alla consegna
                        </Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "100%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            pago contanti alla consegna
                        </Text>
                    </View>
                    <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "100%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                            Resto da portare ?
                        </Text>
                    </View>

                    <View style={{ marginTop: RFPercentage(5), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(3.2), fontWeight: "bold" }} >
                            Totale
                        </Text>
                        <Text style={{ width: "50%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(3.2), fontWeight: "bold" }} >
                            {product.price}
                        </Text>
                    </View>

                </View>

                <View style={{ position: "absolute", bottom: RFPercentage(6), width: "100%", alignItems: "center" }} >
                    <AppTextButton
                        width="80%"
                        name="Conferma e invia richiesta"
                        borderRadius={RFPercentage(1.3)}
                        backgroundColor={colors.primary}
                        onSubmit={() => handleOrder()}
                    />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%"
    },
})
export default CheckoutScreens;