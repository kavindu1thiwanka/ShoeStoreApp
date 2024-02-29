import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AddToCartButton from '../components/AddToCartButton';

const ProductDetailScreen = ({ route }) => {
  const { shoe } = route.params;
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    { user: 'John', profilePic: require('../assets/avatar.jpg'), text: 'Great shoes, very comfortable!' },
    { user: 'Emily', profilePic: require('../assets/avatar.jpg'), text: 'Love the design and quality.' },
    { user: 'Michael', profilePic: require('../assets/avatar.jpg'), text: 'Fast delivery, satisfied with the purchase.' }
  ]);

  const addToCart = () => {
    alert('Product added to cart');
  };

  const submitReview = () => {
    if (review.trim() !== '') {
      setReviews([...reviews, { user: 'You', text: review }]);
      setReview('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: shoe.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{shoe.name}</Text>
        <Text style={styles.brand}>{shoe.brand}</Text>
        <Text style={styles.price}>LKR. {shoe.price}</Text>
        <Text style={styles.description}>{shoe.description}</Text>
        <AddToCartButton onPress={addToCart} />
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Reviews</Text>
          {reviews.map((item, index) => (
            <View key={index} style={styles.reviewItem}>
              <Image source={item.profilePic} style={styles.profilePic} />
              <View style={styles.reviewTextContainer}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            </View>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Add a review"
            value={review}
            onChangeText={text => setReview(text)}
            onSubmitEditing={submitReview}
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
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
    color: '#2ecc71',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  reviewContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    width: 300,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewTextContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
