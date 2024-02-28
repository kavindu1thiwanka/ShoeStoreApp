import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
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
      <Button title="View Cart" onPress={viewCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  shoeList: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
