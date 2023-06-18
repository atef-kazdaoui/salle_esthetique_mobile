import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function Inscription() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [image, setImage] = useState(null);

  const handleInscription = () => {
    // Effectuer les actions d'inscription ici
    console.log('Nom:', nom);
    console.log('Prénom:', prenom);
    console.log('Adresse:', adresse);
    console.log('Adresse e-mail:', email);
    console.log('Mot de passe:', password);
    console.log('Confirmation du mot de passe:', rePassword);
    console.log('Image:', image);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse domicile"
        value={adresse}
        onChangeText={setAdresse}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry={true}
        value={rePassword}
        onChangeText={setRePassword}
      />

      <Button title="Sélectionner une image" onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="S'inscrire" onPress={handleInscription} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F0F4FD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Inscription;
