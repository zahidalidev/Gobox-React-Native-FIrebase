import React from "react";
import { Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Colors from "../config/Colors";

function Screen({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {Platform.OS === "android" ? <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" /> : null}
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default Screen;