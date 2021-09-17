import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import AppTextInput from "../../components/common/AppTextInput"
import AppTextButton from "../../components/common/AppTextButton"
import LoadingModal from "../../components/common/LoadingModal"

// services
import { AddUser } from "../../services/UserServices"

// config
import Colors from '../../config/Colors';

function SignUp({ onPressHandle }) {
    const [indicator, showIndicator] = useState(false);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Enter your Name",
            value: '',
            secure: false,
            icon: "account"
        },
        {
            id: 1,
            placeHolder: "Enter your e-mail",
            value: '',
            secure: false,
            icon: "email-outline"
        },
        {
            id: 2,
            placeHolder: "Create your password",
            value: '',
            secure: true,
            icon: "lock-outline"
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        const name = feilds[0].value.trim();
        const email = feilds[1].value.trim().toLowerCase();
        const password = feilds[2].value.trim();
        const body = {
            name,
            email,
            password
        }
        try {
            showIndicator(true)

            const res = await AddUser(body);
            if (!res) {
                showIndicator(false)
                alert("Email Already Exist!")
                return;
            }
            showIndicator(false)

            alert("Registration Successful!")
            onPressHandle()
            // props.navigation.navigate('LoginScreen')

        } catch (error) {
            console.log("login error: ", error);
            showIndicator(false)
            alert("Something went wrong!")
        }
    }

    return (
        <View style={styles.container}>

            <LoadingModal show={indicator} />

            {/* Text feilds */}
            {feilds.map((item, i) =>
                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(1) : RFPercentage(3), width: "100%" }} >
                    <Text style={{ marginBottom: RFPercentage(2) }} >{item.placeHolder}</Text>
                    <AppTextInput
                        placeHolder={item.placeHolder}
                        width="100%"
                        value={item.value}
                        onChange={(text) => handleChange(text, item.id)}
                        secure={item.secure}
                        icon={item.icon}
                    />
                </View>
            )}

            {/* Login button */}
            <View style={{ width: "100%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                <AppTextButton
                    name="Signup"
                    onSubmit={() => handleSubmit()}
                    backgroundColor={Colors.primary}
                    width="80%"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SignUp;