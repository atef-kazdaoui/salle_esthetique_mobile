import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Picker, TouchableOpacity } from 'react-native';

function ProductList({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://162.19.25.151:5000/categories/categories');
      const data = await response.json();

      setCategories(data.categorie);

    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://162.19.25.151:5000/produit/find');
      const data = await response.json();
      console.log(data);
      setProducts(data.produit || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const fetchFilteredProducts = async (categoryId) => {
    try {
      const response = await fetch(`http://162.19.25.151:5000/produit/filtre/${categoryId}`);
      const data = await response.json();
      console.log(data.client);
      setProducts(data.client);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits filtrés:', error);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0 });
    }
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      fetchFilteredProducts(categoryId);
      console.log(categoryId);
    } else {
      fetchProducts();
    }
  };

  const handleSavoirPlus = (productId) => {
    navigation.navigate('Savoirplus', { id: productId });
    console.log(productId);
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('./background.png')} style={styles.image} />
        </View>
        <View style={styles.productList}>
          <Text>Sélectionnez une catégorie :</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => handleCategoryChange(itemValue)}
          >
            <Picker.Item label="All" value="" />
            {categories.map((category) => (
              <Picker.Item key={category.idcategorie} label={category.nom_categorie} value={category.idcategorie} />
            ))}
          </Picker>
        </View>
        <View style={styles.productList}>
          {products.map((product) => (
            <View key={product.idproduit} style={styles.productItem}>
              <Image source={{ uri: `http://162.19.25.151:5000/images/${product.image}` }} style={styles.productImage} />
              <Text style={styles.productName}>{product.nom_produit}</Text>
              <Text style={styles.productPrice}>{product.prix_produit}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSavoirPlus(product.idproduit)}
              >
                <Text style={styles.buttonText}>Savoir plus</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
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
  
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -200,
  },
  imageContainer: {
    marginTop: -400,
  },
  image: {
    width: 800,
    height: 700,
    resizeMode: 'contain',
  },
  productList: {
    marginTop: 20,
    alignItems: 'center',
  },
  productItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductList;
