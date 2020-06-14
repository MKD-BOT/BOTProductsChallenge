import PushNotification from 'react-native-push-notification';
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    //I am getting an issue configuring the push -notification
    //The feature on the app to integrating with a push notification system
    //was not added
    console.log('Go to Add New Product Form', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});
export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: "there's a new item available ",
    title: 'New Item Available',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};
