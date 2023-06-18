import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Connexion() {
  const [adresse_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (adresse_email !== '') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Navbar' }],
      });
    }
  }, [adresse_email]);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const refreshPage = () => {
    // Recharge la page
    window.location.reload();
  };

  const handleLogin = async () => {
    const data = {
      adresse_email: adresse_email,
      password: password,
    };

    try {
      const response = await fetch('http://162.19.25.151:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        await AsyncStorage.setItem('token', token);
        console.log('Token enregistré avec succès:', token);
        setMessage('Connexion réussie');
        
        refreshPage(); // Actualise la page
        navigation.navigate('Home');
      } else {
        console.error('Erreur de connexion:', responseData.error);
        setMessage('Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.connexion}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={adresse_email}
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4FD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  connexion: {
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 3,
  },
  message: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Connexion;
