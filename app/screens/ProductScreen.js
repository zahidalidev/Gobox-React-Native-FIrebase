import React, { useEffect, useState } from 'react';
import { RefreshControl, FlatList, StyleSheet, TouchableOpacity, View, Modal, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons"

// config
import colors from '../config/Colors';
import ProductCard from '../components/ProductCard';
import AppTextInput from '../components/common/AppTextInput';
import LoadingModal from '../components/common/LoadingModal';
import AppTextButton from '../components/common/AppTextButton';

const height = Dimensions.get('window').height;

function ProductScreen(props) {
    const [searchValue, setSearchValue] = useState('');
    const [oldProducts, setOldProducts] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [showDetailModel, setShowDetailModel] = useState(false);

    const getFilteredProducts = async () => {
        try {
            if (props.route.params.filterProducts) {
                setProducts(props.route.params.filterProducts)
                setOldProducts(props.route.params.filterProducts)
            }
        } catch (error) {

        }
    }

    const handleSearch = () => {
        const tempProducts = [...oldProducts];
        const searhedProducts = tempProducts.filter(item => item.title.search(searchValue) >= 0)
        setProducts(searhedProducts)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFilteredProducts()
        setRefreshing(false);
    }, []);

    useEffect(() => {
        onRefresh()
    }, [props.route.params])

    const getProduct = async (product) => {
        setSelectedProduct(product)
        setShowDetailModel(true)
    }

    const handleOrder = () => {
        setShowDetailModel(false)
        props.navigation.navigate('CheckoutScreens', { item: selectedProduct })
    }
    return (
        <>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Appbar.Header style={{ backgroundColor: colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={colors.white} onPress={() => props.navigation.navigate('homeScreen')} />
                <Appbar.Content color={colors.white} title="Order Food You Love" />
            </Appbar.Header>

            <LoadingModal show={activityIndic} />

            <View style={styles.container}>
                {/* Bottom Contaienr */}
                <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                    {/* Search feilds */}
                    <View style={{ flexDirection: 'column', marginTop: RFPercentage(1) }} >
                        <View style={{ width: "90%" }} >
                            <AppTextInput
                                autoFocus={true}
                                placeHolder="Search for food"
                                width="85%"
                                value={searchValue}
                                onChange={(text) => setSearchValue(text)}
                                rightIcon="magnify"
                                rightFunction={() => handleSearch()}
                                elevation={1}
                                borderWidth={0.4}
                                height={RFPercentage(6.51)}
                            />
                        </View>
                    </View>

                    {/* Products */}
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                        style={{ marginTop: RFPercentage(3) }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={products.length === 0 ? [{ blank: true }] : products}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => getProduct(item)} activeOpacity={0.9} style={{
                                margin: RFPercentage(1),
                                backgroundColor: "white",
                                maxHeight: item.blank ? 0 : null,
                                width: "87%",
                                borderRadius: 8,
                                marginLeft: "6%",
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
                                    <ProductCard index={index} price={item.price} title={item.title} description={item.description} />
                                }
                            </TouchableOpacity>
                        }
                    />

                </View>
            </View>



            <Modal visible={showDetailModel} >
                <View style={styles.container}>
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: (height / 2) - RFPercentage(5), backgroundColor: colors.primary }} >
                        <Text style={{ color: colors.white, fontSize: RFPercentage(6), marginBottom: RFPercentage(4) }} >
                            {selectedProduct.title}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => setShowDetailModel(false)} style={{ position: "absolute", top: RFPercentage(5), right: RFPercentage(3) }} >
                        <AntDesign name="close" size={RFPercentage(3.3)} color={colors.white} />
                    </TouchableOpacity>

                    <View style={{ marginTop: RFPercentage(-6), borderTopLeftRadius: RFPercentage(7), borderTopRightRadius: RFPercentage(7), flex: 1, width: "100%", backgroundColor: colors.white }} >
                        <View style={{ marginTop: RFPercentage(3), flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center" }} >
                            <Text style={{ color: colors.black, fontSize: RFPercentage(7), fontWeight: Platform.OS === 'android' ? "bold" : '300' }} >
                                {selectedProduct.price}
                            </Text>

                            <Text style={{ marginTop: RFPercentage(2), width: "80%", color: colors.black, fontSize: RFPercentage(4) }} >
                                {selectedProduct.title}
                            </Text>
                            <Text style={{ width: "80%", marginTop: RFPercentage(0.5), color: colors.grey, fontSize: RFPercentage(2.3) }} >
                                {selectedProduct.description}
                            </Text>
                            <View style={{ marginTop: RFPercentage(2), width: "80%", justifyContent: "space-between", flexDirection: "row" }} >
                                <Text style={{ width: "80%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                                    Quantity
                                </Text>
                                <Text style={{ width: "80%", marginTop: RFPercentage(0.5), color: colors.black, fontSize: RFPercentage(2.8) }} >
                                    1
                                </Text>
                            </View>

                        </View>

                        <View style={{ position: "absolute", bottom: RFPercentage(6), width: "100%", alignItems: "center" }} >
                            <AppTextButton
                                width="80%"
                                name="Richiedi consegna"
                                borderRadius={RFPercentage(1.3)}
                                backgroundColor={colors.primary}
                                onSubmit={() => handleOrder()}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
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
})

export default ProductScreen;