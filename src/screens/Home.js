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
      return <ActivityIndicator />;
    } else {
      return (
        <View>
          <Text style={styles.city}>{data && data.city.name}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      {displayedWeather()}
      <Text style={styles.day}>Aujourd'hui</Text>
      <Text style={styles.temperature}>17°C</Text>
      <Text style={styles.weather}>Nuageux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  city: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 27,
  },
  day: {
    fontSize: 22,
    textAlign: 'center',
  },
  temperature: {
    fontSize: 77,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weather: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
