import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextDemo = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Text Component</Text>
      <Text style={styles.small}>Small Text</Text>
      <Text style={styles.medium}>Medium Text</Text>
      <Text style={styles.large}>Large Text</Text>
      <Text style={styles.red}>Red Text</Text>
    </View>
  );
};

export default TextDemo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#F54927'
  },

  small: {
    fontSize: 12,
    marginBottom: 5,
    color:'#B7F527'
  },

  medium: {
    fontSize: 18,
    marginBottom: 5,
    color:'#ff9f03ff'
  },

  large: {
    fontSize: 26,
    marginBottom: 5,
    color:'#2798F5'
  },

  red: {
    color: '#7627F5',
    fontSize: 18,
  },
});