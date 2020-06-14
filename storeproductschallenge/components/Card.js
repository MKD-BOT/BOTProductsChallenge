import React from 'react';
import {View, StyleSheet, ShadowPropTypesIOS} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: 400,
    maxWidth: '100%',
    alignItems: 'center',
    shadowColor: 'steelblue',
    shadowOffset: {eidth: 0, height: 2},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
