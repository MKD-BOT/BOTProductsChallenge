import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';

const Product = props => {
  const {product} = props;

  let producticon = require('../assets/product.jpg');
  return (
    <View style={styles.screen}>
      <View style={styles.listItem}>
        <Image style={styles.img} source={producticon} />
        <Text style={styles.categoryStyle}>{product.product_category}</Text>
        <Text style={styles.nameStyle}>{product.product_name}</Text>
        <Text style={styles.weightStyle}>{product.product_weight}</Text>
        <Text style={styles.priceStyle}>{product.product_price}</Text>
        <Text style={styles.currStyle}>{product.product_currency}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: 20,
    height: 20,
  },

  delimg: {
    width: 30,
    height: 30,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
    marginVertical: 0,
    backgroundColor: 'whitesmoke',
    width: '100%',
  },

  categoryStyle: {
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    justifyContent: 'space-around',
    fontSize: 12,
    width: '20%',
  },

  nameStyle: {
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    justifyContent: 'space-around',
    fontSize: 12,
    width: '20%',
  },

  weightStyle: {
    color: 'black',
    textAlign: 'right',
    paddingLeft: 0,
    justifyContent: 'space-around',
    fontSize: 12,
    width: '20%',
  },

  priceStyle: {
    color: 'black',
    textAlign: 'right',
    paddingLeft: 0,
    justifyContent: 'space-around',
    fontSize: 12,
    width: '20%',
  },

  currStyle: {
    color: 'black',
    textAlign: 'right',
    paddingLeft: 0,
    justifyContent: 'space-around',
    fontSize: 12,
    width: '10%',
  },
});

export default Product;
