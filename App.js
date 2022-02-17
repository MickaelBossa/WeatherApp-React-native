// Librairies
import React from 'react';
import {View, SafeAreaView} from 'react-native';

// Composants
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Home />
      </SafeAreaView>
    </View>
  );
}
