import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
  const { cartItems, setCartItems } = route.params; // Destructure cartItems and setCartItems from route params
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to remove item from cart
  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1); // Remove item at the given index
    setCartItems(newCartItems); // Update cart items
    // Recalculate total price after removing item
    calculateTotalPrice(newCartItems);
  };

  // Function to calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(total.toFixed(2)); // Set total price with 2 decimal places
  };

  // Calculate total price on initial render
  useState(() => {
    calculateTotalPrice(cartItems);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>LKR. {item.price}</Text>
                <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeItemButton}>
                  <Text style={styles.removeItemText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Price: LKR. {totalPrice}</Text>
            <TouchableOpacity style={styles.purchaseButton} onPress={() => alert('Purchase button clicked')}>
              <Text style={styles.purchaseButtonText}>Purchase</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  removeItemButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeItemText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  purchaseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
  },
});

export default CartScreen;
