import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Button,
} from 'react-native';
import colors from '../constants/colors';
import {insertNewProduct} from '../databases/allSchemas';
// import realm from '../databases/allSchemas';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Product_Category: '',
      Product_Name: '',
      Product_Weight: '',
      Product_Price: 0,
      ActivityIndicator_Loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.getScannedProduct();
  }

  getScannedProduct() {
    console.log('Getting Scanned Product Data...');
    if (this.props.attr[0] != undefined) {
      console.log('Getting Scanned Product Data...', this.props.attr[0]);

      this.setState({waitCursor: true});
      // this._isMounted = true;
      this.setState({
        Product_Category: this.props.attr[0],
        Product_Name: this.props.attr[1],
        Product_Weight: this.props.attr[2],
        Product_Price: this.props.attr[3],
        Product_Currency: this.props.attr[4],
        waitCursor: null,
      });
    }
  }

  handleBtnPress = () => {
    this.props.onBtnPress('ScanProduct');
  };

  Insert_Product = () => {
    if (
      this.state.Product_Category == '' ||
      this.state.Product_Name == '' ||
      this.state.Product_Weight == '' ||
      this.state.Product_Price == '' ||
      this.state.Product_Currency == ''
    ) {
      alert('Kindly fill all the Data...');
    } else {
      const newProduct = {
        id: Math.floor(Date.now() / 1000),
        product_category: this.state.Product_Category,
        product_name: this.state.Product_Name,
        product_weight: this.state.Product_Weight,
        product_price: parseFloat(this.state.Product_Price),
        product_currency: this.state.Product_Currency,
      };
      console.log(`Category ${this.state.Product_Category}`);
      insertNewProduct(newProduct)
        .then(this.props.onBtnPress('StoreProducts'))
        .catch(error => {
          alert(`Insert new Product error ${error}`);
        });
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Scan Product QR Code</Text>
          <TouchableWithoutFeedback onPress={this.handleBtnPress}>
            <Image
              style={styles.img}
              source={require('../assets/scancode.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <TextInput
          placeholder="Product Category..."
          style={styles.TextInputStyleClass}
          underlineColorAndroid="transparent"
          value={this.state.Product_Category}
          onChangeText={TextInputText =>
            this.setState({Product_Category: TextInputText})
          }
        />
        <TextInput
          placeholder="Product Name..."
          style={styles.TextInputStyleClass}
          underlineColorAndroid="transparent"
          value={this.state.Product_Name}
          onChangeText={TextInputText =>
            this.setState({Product_Name: TextInputText})
          }
        />
        <TextInput
          placeholder="Product Weight..."
          style={styles.TextInputStyleClass}
          underlineColorAndroid="transparent"
          value={this.state.Product_Weight}
          onChangeText={TextInputText =>
            this.setState({Product_Weight: TextInputText})
          }
        />
        <TextInput
          placeholder="Product Price..."
          style={styles.TextInputStyleClass}
          value={this.state.Product_Price}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          underlineColorAndroid="transparent"
          onChangeText={TextInputText =>
            this.setState({Product_Price: TextInputText})
          }
        />
        <TextInput
          placeholder="Currency..."
          style={styles.TextInputStyleClass}
          underlineColorAndroid="transparent"
          value={this.state.Product_Currency}
          onChangeText={TextInputText =>
            this.setState({Product_Currency: TextInputText})
          }
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.TouchableOpacityStyle}
          onPress={this.Insert_Product}>
          <Text style={styles.TextStyle}>Add Product</Text>
        </TouchableOpacity>

        <Button
          onPress={() => this.props.onBtnPress('StoreProducts')}
          title="Cancel"
        />

        {this.state.ActivityIndicator_Loading ? (
          <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    color: 'orange',
    fontSize: 12,
  },
  img: {
    width: 40,
    height: 40,
  },

  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    marginBottom: 10,
    width: '95%',
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.buttonColor,
    marginBottom: 20,
    width: '90%',
    borderRadius: 6,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },

  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductForm;
