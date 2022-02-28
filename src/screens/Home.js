// Librairies
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {API_KEY} from '@env';

// API KEY
let apiKey = API_KEY;

// API
const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=fr&units=metric`;

export default function Home() {
  // States
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

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
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();

    // Récupérer la localisation
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        getWeather(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  // Requête au serveur
  const getWeather = async location => {
    try {
      const response = await axios.get(
        API_URL(location.latitude, location.longitude),
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Afficher un chargement puis la météo
  const displayedWeather = () => {
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{data && data.city.name}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>{displayedWeather()}</Text>
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
