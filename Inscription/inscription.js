import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function Inscription() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse_domicile, setAdresse_domicile] = useState('');
  const [adresse_email, setadresse_Email] = useState('');
  const [numero_telephone, setnumero_telephone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [image, setImage] = useState(null);

  const handleInscription = async () => {
    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('adresse_domicile', adresse_domicile);
      formData.append('adresse_email', adresse_email);
      formData.append('numero_telephone', numero_telephone);
      formData.append('password', password);
      formData.append('re_password', rePassword);

      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        formData.append('image', { uri: localUri, name: filename, type });
      }
       
      const response = await axios.post('http://localhost:5000/users/inscription', formData);

      console.log(response.data);
      // Traitez la réponse ici (par exemple, redirigez l'utilisateur, affichez un message, etc.)
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      // Gérez l'erreur ici (par exemple, affichez un message d'erreur)
    }
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom :</Text>
        <TextInput
          style={styles.input}
          placeholder='Votre nom'
          value={nom}
          onChangeText={setNom}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          placeholder='Votre prénom'
          value={prenom}
          onChangeText={setPrenom}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Adresse domicile :</Text>
        <TextInput
          style={styles.input}
          placeholder='Votre adresse domicile'
          value={adresse_domicile}
          onChangeText={setAdresse_domicile}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Numero de téléphone :</Text>
        <TextInput
          style={styles.input}
          placeholder='Votre numéro de téléphone'
          value={numero_telephone}
          onChangeText={setnumero_telephone}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Adresse e-mail :</Text>
        <TextInput
          style={styles.input}
          placeholder='Votre adresse e-mail'
          value={adresse_email}
          onChangeText={setadresse_Email}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder='Choisissez un mot de passe'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Confirmer le mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder='Confirmer le mot de passe'
          secureTextEntry={true}
          value={rePassword}
          onChangeText={setRePassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Sélectionner une image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={handleInscription}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4FD',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: 'black',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4fa94d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Inscription;
