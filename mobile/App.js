import React, { useEffect, useState } from 'react';
import geolocation from '@react-native-community/geolocation';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  SafeAreaView, StyleSheet, View, Text,
  StatusBar, PermissionsAndroid, TouchableOpacity
} from 'react-native';

import Share from './src/components/share';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [watchId, setWatchId] = useState(-999);
  const API_URL = 'http://192.168.0.109:3001';
  const FRONT_URL = 'http://192.168.0.109:3000';
  const room = uuidv4();
  const urlShare = `${FRONT_URL}/${room}`;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const startLocation = () => {
    setWatchId(geolocation.watchPosition(success => {
      sendPosition(success.coords.latitude, success.coords.longitude);
      setLatitude(success.coords.latitude);
      setLongitude(success.coords.longitude);
    }, error => {
      console.log('!!!', error);
    }));
  }

  const stopLocation = () => {
    geolocation.clearWatch(watchId);
    geolocation.stopObserving();

    setWatchId(-999);
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission",
          message:
            "This app need your location to share position with your friends",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const sendPosition = async (latitude, longitude) => {
    await axios.post(
      `${API_URL}/change-position/${room}`,
      { latitude, longitude }
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.viewID}>
            <Text>{room}</Text>
          </View>

          <TouchableOpacity onPress={startLocation}>
            <View style={styles.buttonStart} >
              <Text>INICIAR</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={stopLocation}>
            <View style={styles.buttonStop} >
              <Text>PARAR</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.viewTextPosition}>
            <Text style={styles.textPosition}>Latitude: {latitude}</Text>
            <Text style={styles.textPosition}>Longitude: {longitude}</Text>
          </View>

          {watchId >= 0 &&
            <View style={styles.viewShare}>
              <Share message={urlShare} />
            </View>
          }
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  viewID: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  buttonStart: {
    marginBottom: 30,
    backgroundColor: '#0bd402',
    height: 80,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  buttonStop: {
    marginBottom: 30,
    backgroundColor: '#EB2101',
    height: 80,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  viewShare: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  viewTextPosition: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPosition: {
    fontSize: 20
  }
});