'use strict';

import React, {Component} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {insertNewProduct} from '../databases/allSchemas';

const ScanScreen = props => {
  const Insert_Product = productinfo => {
    if (
      productinfo[0] == '' ||
      productinfo[1] == '' ||
      productinfo[2] == '' ||
      productinfo[3] == '' ||
      productinfo[4] == ''
    ) {
      //Do nothing
    } else {
      const newProduct = {
        id: Math.floor(Date.now() / 1000),
        product_category: productinfo[0],
        product_name: productinfo[1],
        product_weight: productinfo[2],
        product_price: parseFloat(productinfo[3]),
        product_currency: productinfo[4],
      };
      insertNewProduct(newProduct)
        .then()
        .catch(error => {
          alert(`Insert new Product error ${error}`);
        });
    }
  };

  const goToProductList = () => {
    console.log('Going to List');
    props.onScanPress([], 'StoreProducts');
  };

  const onSuccess = e => {
    let productInfo = e.data.split(',');
    console.log(props.attr);
    if (props.attr == 'ScanProduct') {
      props.onScanPress(productInfo, props.attr);
    } else if (props.attr == 'ScanSaveProduct') {
      Insert_Product(productInfo);
      props.onScanPress(productInfo, props.attr);
    }
  };

  return (
    // <View style={styles.headerContainer}>
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Scan Product</Text>
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={goToProductList}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      }
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen;
