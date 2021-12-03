import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import RestaurentCard from "../components/RestaurentCard";

// config
import colors from '../config/Colors';
import LoadingModal from '../components/common/LoadingModal';
import { getAllNewRestaurents, getRestaurentRef } from '../services/RestaurantServices';

function RestaurentsScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllRestaurents();
        setRefreshing(false);
    }, []);

    const getAllRestaurents = async () => {
        try {
            setActivityIndic(true)
            let categoryRef = await getRestaurentRef();

            // let tempCategories = [...categories];
            categoryRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    let res = await getAllNewRestaurents()
                    console.log("res :", res)
                    setCategories(res)
                });
            });
        } catch (error) {
            console.log("Categories found: ", error)
        }
        setRefreshing(false)
        setActivityIndic(false);
    }

    useEffect(() => {
        getAllRestaurents();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');

            // Restart();
            props.navigation.navigate('LoginScreen')
        } catch (error) {
            alert("Logout Error: ", error)
            console.log("Logout Error: ", error)
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />

            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.Action onPress={() => handleLogout()} color={colors.white} icon="import" />
            </Appbar.Header>

            <View style={styles.container}>

                <LoadingModal show={activityIndic} />

                <View style={{ marginTop: RFPercentage(4) }} ><Text style={{ fontSize: RFPercentage(4), fontWeight: "bold", color: colors.primary }} >Select Restaurant</Text></View>

                {/* Bottom Contaienr */}
                <View style={{ flexDirection: 'column', marginTop: RFPercentage(1), borderTopLeftRadius: RFPercentage(4), borderTopRightRadius: RFPercentage(4), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                    {/* Categories */}
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                        style={{ marginTop: RFPercentage(5) }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={categories.length === 0 ? [{ blank: true }] : categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen")} activeOpacity={0.9} style={{
                                margin: RFPercentage(1),
                                marginBottom: RFPercentage(1.5),
                                marginRight: RFPercentage(2),
                                backgroundColor: "white",
                                maxHeight: item.blank ? 0 : null,
                                shadowColor: '#b5b5b5',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 3,
                                elevation: 7,
                                borderRadius: RFPercentage(2),
                                width: RFPercentage(21), height: RFPercentage(21),
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }} >
                                {item.blank ? null :
                                    <RestaurentCard index={index} image={item.image} title={item.name} />
                                }
                            </TouchableOpacity>

                        }
                    />

                </View>

            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    loginButton: { marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }
})

export default RestaurentsScreen;