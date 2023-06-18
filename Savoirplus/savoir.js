import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Savoir({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://162.19.25.151:5000/produit/filtre/${id}`);
      const data = await response.json();
      console.log("voici", data.client);
      setProduct(data.client);
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
    }
  };

  const addToCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setErrorMessage("Il faut se connecter pour ajouter au panier");
        return;
      }
      
      const decodedToken = decryptToken(token);
      if (!decodedToken || !decodedToken.iduser) {
        console.error('ID utilisateur introuvable dans le token');
        return;
      }
      
      const data = {
        idProduit: product[0].idProduit,
        idUser: decodedToken.iduser,
      };

      const response = await fetch('http://162.19.25.151:5000/panier/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Produit ajouté au panier:', product[0].nom_produit);
      } else {
        console.error('Erreur lors de l\'ajout du produit au panier');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit au panier:', error);
    }
  };

  return (
    <View style={styles.container}>
      {product ? (
        <View style={styles.productContainer}>
          <Image
            source={{ uri: `http://162.19.25.151:5000/images/${product[0].image}` }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product[0].nom_produit}</Text>
            <Text style={styles.productDescription} numberOfLines={5}>
              {product[0].description_produit}
            </Text>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : (
              <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                <Text style={styles.addToCartButtonText}>Ajouter au panier</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
    maxHeight: 120,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 8,
    fontStyle: 'italic',
  },
});

export default Savoir;
