import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';

import Product from './Product';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedProduct: '',
    };

    this.onBtnPress = this.props.onBtnPress.bind(this);
  }

  render() {
    const {products, onBtnPress} = this.props;
    console.log('Product List Loaded');
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Scan Product QR Code </Text>
            <TouchableWithoutFeedback
              onPress={() => this.onBtnPress('ScanSaveProduct')}>
              <Image
                style={styles.imgScan}
                source={require('../assets/scancode.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Fill Product Form </Text>
            <TouchableWithoutFeedback
              onPress={() => this.onBtnPress('ProductForm')}>
              <Image
                style={styles.imgAddNew}
                source={require('../assets/addbutton.png')}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.listItem}>
          {products.map(product => (
            <Product
              key={product.id}
              onBtnPress={onBtnPress}
              product={product}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgScan: {
    width: 40,
    height: 40,
  },

  imgAddNew: {
    width: 30,
    height: 30,
  },

  headerTitle: {
    color: 'orange',
    fontSize: 18,
  },

  headerContainer: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  headerRow: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  listItem: {
    flexDirection: 'column',
    padding: 0,
    marginVertical: 0,
    width: '100%',
  },
});

export default Products;
