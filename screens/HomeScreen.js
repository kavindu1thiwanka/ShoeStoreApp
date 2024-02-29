import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import shoesData from '../data/shoesData.json';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [shoes, setShoes] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch shoe data
  const fetchShoes = async () => {
    try {
      setShoes(shoesData);
    } catch (error) {
      console.error('Error fetching shoe data:', error);
    }
  };

  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Fetch shoe data on component mount
  useEffect(() => {
    fetchShoes();
  }, []);

  // Navigate to CartScreen
  const viewCart = () => {
    navigation.navigate('Cart', { cartItems, setCartItems });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Shoe Store</Text>
        <Image source={require('../assets/shoe-banner.jpg')} style={styles.bannerImage} />
      </View>
      <FlatList
        data={shoes}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { shoe: item })}
            addToCart={addToCart}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.shoeList}
      />
      <TouchableOpacity style={styles.cartButton} onPress={viewCart}>
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  shoeList: {
    paddingHorizontal: 20,
  },
  cartButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
