import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AddToCartButton from '../components/AddToCartButton';

const ProductDetailScreen = ({ route }) => {
  // Extract the product details from the route params
  const { shoe } = route.params;

  const addToCart = () => {
    alert('Product added to cart');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: shoe.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{shoe.name}</Text>
        <Text style={styles.brand}>{shoe.brand}</Text>
        <Text style={styles.price}>LKR. {shoe.price}</Text>
        <Text style={styles.description}>{shoe.description}</Text>
        <AddToCartButton onPress={addToCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ProductDetailScreen;
