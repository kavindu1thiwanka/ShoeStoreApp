import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

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
                <Text>{item.name}</Text>
                <Text>LKR. {item.price}</Text>
                <Button title="Remove" onPress={() => removeItem(index)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.totalContainer}>
            <Text>Total Price: LKR. {totalPrice}</Text>
            <Button title="Purchase" onPress={() => alert('Purchase button clicked')} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  emptyText: {
    fontSize: 16,
  },
});

export default CartScreen;
