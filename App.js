import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// "firebase": "^8.3.2",
//     "react-native-reanimated": "~2.2.0",
//     "react-native-responsive-fontsize": "^0.5.0",
//     "react-native-safe-area-context": "3.2.0",
//     "react-native-screens": "^3.1.1",
//     "react-navigation": "^4.4.4",
//     "react-navigation-stack": "^2.10.4"