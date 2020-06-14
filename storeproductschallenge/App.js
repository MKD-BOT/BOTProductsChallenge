import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import ProductForm from './screens/ProductForm';
import StoreProducts from './screens/StoreProducts';
import QRCodeScanner from './screens/QRCodeScanner';

export default function App() {
  const [displayScreen, setdisplayScreen] = useState('StoreProducts');
  const [dataQRCode, setdataQRCode] = useState([]);

  const screenHandler = screenName => {
    console.log('Handling Screen ...', screenName);
    setdataQRCode([]);
    setdisplayScreen(screenName);
  };

  const scanedDataHandler = (QRCodeData, SrcScreen) => {
    console.log('Reported Screen ', SrcScreen);
    if (SrcScreen == 'ScanProduct') {
      setdisplayScreen('ProductForm');
      setdataQRCode(QRCodeData);
    } else {
      setdisplayScreen('StoreProducts');
    }
  };

  let content = <StoreProducts onBtnPress={screenHandler} />;
  if (displayScreen == 'ProductForm') {
    content = <ProductForm onBtnPress={screenHandler} attr={dataQRCode} />;
  } else if (
    displayScreen == 'ScanProduct' ||
    displayScreen == 'ScanSaveProduct'
  ) {
    content = (
      <QRCodeScanner onScanPress={scanedDataHandler} attr={displayScreen} />
    );
  } else {
    console.log('Displaying Store Products Form ...');
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={styles.screen}>{content}</SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    flex: 1,
  },
});
