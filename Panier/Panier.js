import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PanierScreen() {
  const cartItems = [
    { name: 'Produit 1', price: 10 },
    { name: 'Produit 2', price: 15 },
    { name: 'Produit 3', price: 20 },
  ];
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panier</Text>
      <ScrollView>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.total}>Montant total: {totalAmount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});
