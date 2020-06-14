import React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/colors';
import {deleteAllProducts} from '../databases/allSchemas';

const Header = props => {
  let deletebtn = require('../assets/delete-btn.png');
  const deleteProducts = () => {
    console.log(`Deleting All Products`);
    Alert.alert(
      'Delete',
      'Are you sure you want to Delete all products',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            deleteAllProducts()
              .then(props.onDeletePress())
              .catch(error => {
                alert(`Failed to delete the store products, error ${error}`);
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.TouchableOpacityStyle}
        onPress={deleteProducts}>
        <Image style={styles.img} source={deletebtn} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: Colors.headerForeColor,
    fontSize: 14,
    marginRight: 10,
  },
  img: {
    paddingRight: 10,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
