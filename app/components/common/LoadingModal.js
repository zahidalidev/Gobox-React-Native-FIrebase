import React from 'react';
import { Modal, View, ActivityIndicator, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowHeight = Dimensions.get('window').height

// config
import Colors from '../../config/Colors';

function LoadingModal({ show }) {
    return (
        <Modal visible={show} transparent={true} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <View style={{ marginTop: (windowHeight / 2) - 50, width: "100%", height: RFPercentage(10), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                <View style={{ elevation: 5, width: RFPercentage(10), height: RFPercentage(10), borderRadius: 10, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size={RFPercentage(5)} color={Colors.primary} />
                </View>
            </View>
        </Modal>
    );
}

export default LoadingModal;