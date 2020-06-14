import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import Header from '../components/Header.js';
import Products from '../components/Products.js';
import Card from '../components/Card.js';
import {getAllProducts} from '../databases/allSchemas';
// import {LocalNotification} from '../services/LocalPushController';

class StoreProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: 'Products',

      displayedProducts: [],

      waitCursor: null,
    };
  }

  UNSAFE_componentWillMount() {
    this.fillProducts();
  }

  fillProducts = () => {
    getAllProducts()
      .then(displayedProducts => {
        this.setState({displayedProducts});
      })
      .catch(error => {
        this.setState({displayedProducts: []});
      });
  };

  // handleButtonPress = () => {
  //   LocalNotification();
  // };

  render() {
    return (
      <View style={styles.screen}>
        {/* <View style={styles.container}>
          <Text>Press the button to trigger the notification</Text>
          <View style={{marginTop: 20}}>
            <Button
              title={'Local Push Notification'}
              onPress={this.handleButtonPress}
            />
          </View>
        </View> */}
        <Header
          title={'Products in Store'}
          onBtnPress={this.props.onBtnPress}
          onDeletePress={this.fillProducts}
        />

        <Card>
          <Products
            products={this.state.displayedProducts}
            onBtnPress={this.props.onBtnPress}
          />
        </Card>

        {this.state.waitCursor ? (
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
  headerContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
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

  img: {
    width: 40,
    height: 40,
  },
});

export default StoreProducts;
