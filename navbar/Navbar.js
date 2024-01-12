import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import logoIcon from './logo192.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Vérifier si un token est déjà enregistré lors du chargement de l'écran
    getTokenFromStorage();
  }, []);

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('Token récupéré:', token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.log('Erreur lors de la suppression du token:', error);
    }
  };

  useEffect(() => {
    // Mettre à jour le state isLoggedIn lorsque la valeur change
    const updateLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(token !== null);
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
    };

    updateLoginStatus();
  }, []);

  useEffect(() => {
    // Actualiser la page lorsque le token change
    navigation.addListener('focus', () => {
      getTokenFromStorage();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image source={logoIcon} style={styles.icon} />
          <Text style={styles.navbarTitle}>Home</Text>
        </TouchableOpacity>
        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.navbarItem}
            onPress={() => navigation.navigate('Connexion')}
          >
            <Text style={styles.navbarTitle}>Connexion</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate('Inscription')}
        >
          <Text style={styles.navbarTitle}>Inscription</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity style={styles.navbarItem} onPress={handleLogout}>
            <Text style={styles.navbarTitle}>Déconnexion</Text>
          </TouchableOpacity>
        )}
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  navbar: {
    backgroundColor: '#F0F4FD',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  navbarItem: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 24,
    marginRight: 10,
  },
});
