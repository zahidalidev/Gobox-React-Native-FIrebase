import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeCrossPicker from "react-native-cross-picker"
import * as ImagePicker from 'expo-image-picker';

// components
import AppTextInput from '../components/common/AppTextInput';
import AppTextButton from '../components/common/AppTextButton';

// config
import Colors from '../config/Colors';

//services
import { addCategory, getCategories } from '../services/CategoryServices';
import { addProduct } from '../services/ProductServices';
import LoadingModal from '../components/common/LoadingModal';
import { getAllNewOrders, getOrderRef } from '../services/OrderServices';
import ProductCard from '../components/ProductCard';
import { addRestaurant } from '../services/RestaurantServices';

function AdminScreen(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [activeComponent, setActiveComponent] = useState('product');

    const [category, setCategory] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [selectedCategory, setDropCategory] = useState('')
    const [allCategories, setAllCategories] = useState([])
    const [allOrders, setAllOrders] = useState([])

    const [imageSelected, setImageSelected] = useState(false);
    const [image, setImage] = useState('');

    const [foodFeils, setFoodFields] = useState([
        {
            id: 0,
            placeHolder: "Title",
            value: '',
        },
        {
            id: 1,
            placeHolder: "Price",
            value: '',
        },
        {
            id: 2,
            placeHolder: "description",
            value: '',
        },

    ]);

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }

    const uploadImages = async () => {
        try {
            console.log("im")
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 0.6
            });


            const { uri } = pickerResult;

            setImage(uri)
            setImageSelected(true)
        } catch (error) {
            console.log("Image error: ", error)
        }
    }

    const getAllCategories = async () => {
        setActivityIndic(true)
        try {
            let categoryRef = await getCategories();

            let tempCategories = [...allCategories];
            categoryRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        let newData = change.doc.data()

                        let hasObject = []
                        tempCategories.filter(item => {
                            if (item.label === newData.label) {
                                hasObject.push(true)
                            }
                        });

                        if (!(hasObject.includes(true))) {
                            tempCategories.push(change.doc.data())
                            setAllCategories(tempCategories)
                        }
                    }
                    if (change.type === 'modified') {
                        console.log('Modified city: ', change.doc.data());
                    }
                    if (change.type === 'removed') {
                        console.log('Removed city: ', change.doc.data());
                    }
                });
            });

        } catch (error) {
            alert("Categories not found please add them");
            console.log("Categories found: ", error)
        }
        setActivityIndic(false)
    }

    useEffect(() => {
        getAllCategories()
        getAllOrders()
    }, [])

    const handleCategory = async () => {
        setActivityIndic(true)
        if (category === '') {
            alert("Title is empty")
            return;
        }
        try {
            const res = await addCategory(category)
            if (res) {
                alert("Category Added")
            } else {
                alert("Something went wrong!")
            }
        } catch (error) {
            console.log("category add: ", error)
        }
        setActivityIndic(false)
    }

    const handleChangeProduct = (text, index) => {
        let tempFields = [...foodFeils];
        tempFields[index].value = text;
        setFoodFields(tempFields)
    }

    const handleProduct = async () => {
        setActivityIndic(true)

        const title = foodFeils[0].value
        const price = foodFeils[1].value
        const description = foodFeils[2].value
        const category = selectedCategory;

        if (title === '' || price === '' || description === '' || category === '') {
            alert("All fields are required")
            setActivityIndic(false)
            return;
        }

        let body = {
            title,
            price,
            category,
            description,
        }

        try {
            const res = await addProduct(body)
            if (!res) {
                console.log("product addition error: ", res)

                alert("Product Not Added");
                setActivityIndic(false)
                return;
            }

            alert("Product Added");

        } catch (error) {
            console.log("product added erro: ", error)
        }
        setActivityIndic(false)
    }

    const getAllOrders = async () => {
        try {
            setActivityIndic(true)
            let productRef = await getOrderRef();

            productRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {
                    let productRes = await getAllNewOrders();
                    setAllOrders(productRes)
                });
            });
        } catch (error) {
            console.log("Products found: ", error)
        }
        setActivityIndic(false);
    }

    const handleRestaurant = async () => {
        setActivityIndic(true)
        if (restaurant === '') {
            alert("Add the Restaurant Name")
            return;
        }
        try {
            const res = await addRestaurant(restaurant, image)
            if (res) {
                alert("Restaurant Added")
            } else {
                alert("Something went wrong!")
            }
        } catch (error) {
            console.log("Restaurant add: ", error)
        }
        setActivityIndic(false)
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={Colors.primary} />

            <LoadingModal show={activityIndic} />

            <Appbar.Header style={{ backgroundColor: Colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={Colors.white} onPress={() => props.navigation.navigate('HomeScreen')} />
                <Appbar.Content color={Colors.white} title="Admin Panel" />
            </Appbar.Header>

            <View style={styles.container}>

                {/* Bottom Contaienr */}
                <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: Colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                    {/* buttons */}
                    <View style={{ flexDirection: 'column', marginTop: RFPercentage(1), backgroundColor: Colors.primary }} >
                        <View style={{ width: "90%", flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => setActiveComponent('product')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "25%", padding: RFPercentage(2), backgroundColor: activeComponent === 'product' ? Colors.secondaryLight : null }} >
                                <Text numberOfLines={1} style={{ fontWeight: "bold", color: Colors.white, fontSize: RFPercentage(1.8) }} >Product</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveComponent('category')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "25%", padding: RFPercentage(2), backgroundColor: activeComponent === 'category' ? Colors.secondaryLight : null }} >
                                <Text numberOfLines={1} style={{ fontWeight: "bold", color: Colors.white, fontSize: RFPercentage(1.8) }} >Category</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveComponent('orders')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "25%", padding: RFPercentage(2), backgroundColor: activeComponent === 'orders' ? Colors.secondaryLight : null }} >
                                <Text numberOfLines={1} style={{ fontWeight: "bold", color: Colors.white, fontSize: RFPercentage(1.8) }} >Orders</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveComponent('restaurant')} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "25%", padding: RFPercentage(2), backgroundColor: activeComponent === 'restaurant' ? Colors.secondaryLight : null }} >
                                <Text numberOfLines={1} style={{ fontWeight: "bold", color: Colors.white, fontSize: RFPercentage(1.8) }} >Restaurant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        activeComponent === 'product' ?
                            <View style={{ marginTop: RFPercentage(2), backgroundColor: Colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                {/* Text feilds */}
                                {foodFeils.map((item, i) =>
                                    <View key={i} style={{ marginTop: i == 0 ? RFPercentage(6) : RFPercentage(4), width: "85%" }} >
                                        <AppTextInput
                                            placeHolder={item.placeHolder}
                                            width="100%"
                                            value={item.value}
                                            onChange={(text) => handleChangeProduct(text, item.id)}
                                            secure={item.secure}
                                        />
                                    </View>
                                )}

                                <ReactNativeCrossPicker
                                    modalTextStyle={{ color: "rgb(0, 74, 173)" }}
                                    mainComponentStyle={{ marginTop: RFPercentage(4), width: "85%", borderWidth: 0, backgroundColor: Colors.white }}
                                    iconComponent={iconComponent}
                                    items={allCategories}
                                    setItem={setDropCategory} selectedItem={selectedCategory}
                                    placeholder="Select Category"
                                    modalMarginTop={"70%"} // popup model margin from the top 
                                />

                                {/* Add Item Button */}
                                <View style={{ marginTop: RFPercentage(10), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                    <AppTextButton
                                        name="Add Item"
                                        borderRadius={RFPercentage(1.3)}
                                        onSubmit={() => handleProduct()}
                                        backgroundColor={Colors.primary}
                                        width="100%"
                                        height={RFPercentage(5.5)}
                                    />
                                </View>

                            </View> : null
                    }
                    {
                        activeComponent === 'category' ?
                            <View style={{ marginTop: RFPercentage(2), backgroundColor: Colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                {/* Text feilds */}
                                <View style={{ marginTop: RFPercentage(6), width: "85%" }} >
                                    <AppTextInput
                                        placeHolder="Category Title"
                                        width="100%"
                                        value={category}
                                        onChange={(text) => setCategory(text)}
                                    />
                                </View>

                                {/* Add Item Button */}
                                <View style={{ marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                    <AppTextButton
                                        name="Add Category"
                                        borderRadius={RFPercentage(1.3)}
                                        onSubmit={() => handleCategory()}
                                        backgroundColor={Colors.primary}
                                        width="100%"
                                        height={RFPercentage(5.5)}
                                    />
                                </View>

                            </View> : null
                    }

                    {
                        activeComponent === 'orders' ?
                            <View style={{ marginTop: RFPercentage(2), backgroundColor: Colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                {/* Products */}
                                <FlatList
                                    style={{ marginTop: RFPercentage(3) }}
                                    showsVerticalScrollIndicator={false}
                                    data={allOrders}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) =>
                                        <TouchableOpacity activeOpacity={1} style={{
                                            margin: RFPercentage(1),
                                            backgroundColor: "white",
                                            maxHeight: item.blank ? 0 : null,
                                            width: "90%",
                                            marginLeft: "4%",
                                            borderRadius: 8,
                                            alignItems: "center",
                                            flexDirection: "column",
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }} >
                                            {item.blank ? null :
                                                <ProductCard order={true} quantity={item.quantity} number={item.number} totalPrice={item.totalPrice} name={item.name} address={item.address} index={index} price={item.price} title={item.title} description={item.description} />
                                            }
                                        </TouchableOpacity>
                                    }
                                />


                            </View> : null
                    }


                    {
                        activeComponent === 'restaurant' ?
                            <View style={{ marginTop: RFPercentage(2), backgroundColor: Colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                <View style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(4), width: "85%", }} >
                                    <TouchableOpacity onPress={() => uploadImages()} style={{ borderRadius: RFPercentage(1.3), backgroundColor: Colors.primary, width: "50%", height: RFPercentage(6), justifyContent: "center", alignItems: "center" }} >
                                        <Text style={{ color: Colors.white, fontSize: RFPercentage(2.3) }} >Upload Image</Text>
                                    </TouchableOpacity>
                                    {imageSelected ?
                                        <Image resizeMode="center" source={{ uri: image }} style={{ borderRadius: RFPercentage(2), width: RFPercentage(20), height: RFPercentage(13), marginLeft: RFPercentage(2), marginBottom: RFPercentage(1) }} />
                                        : <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), color: Colors.danger, fontSize: RFPercentage(1.8) }} >* Image is Not Selected</Text>
                                    }
                                </View>

                                {/* Text feilds */}
                                <View style={{ marginTop: RFPercentage(6), width: "85%" }} >
                                    <AppTextInput
                                        placeHolder="Restaurant Name"
                                        width="100%"
                                        value={restaurant}
                                        onChange={(text) => setRestaurant(text)}
                                    />
                                </View>

                                {/* Add Item Button */}
                                <View style={{ marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }} >
                                    <AppTextButton
                                        name="Add Restaurant"
                                        borderRadius={RFPercentage(1.3)}
                                        onSubmit={() => handleRestaurant()}
                                        backgroundColor={Colors.primary}
                                        width="100%"
                                        height={RFPercentage(5.5)}
                                    />
                                </View>

                            </View> : null
                    }
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default AdminScreen;