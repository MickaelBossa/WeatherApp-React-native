// Librairies
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid, Button} from 'react-native';
import GetLocation from 'react-native-get-location';

export default function Home() {
  useEffect(() => {
    // Demander la permission pour avoir accès à la localisation
    const requestLocationPermission = async permission => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'WeatherApp aimerait accéder à votre position',
            message:
              "WeatherApp à besoin d'accéder à votre position pour pouvoir vous fournir la météo de votre ville",
            buttonNeutral: 'Demandez moi plus tard',
            buttonNegative: 'Retour',
            buttonPositive: 'Ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
          console.log(granted);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    // Récupérer la localisation
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
