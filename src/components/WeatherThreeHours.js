import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export default function WeatherThreeHours() {
  return (
    <View style={styles.container}>
      <Text>20h</Text>
      <Text>Nuageux</Text>
      <Text>14°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').height * 0.13,
    borderRadius: Dimensions.get('window').width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Dimensions.get('window').width * 0.07,
    marginTop: Dimensions.get('window').height * 0.07,
  },
});
