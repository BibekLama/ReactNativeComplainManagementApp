import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Easing,Animated} from 'react-native';

//Screens

import LoginScreen from './screens/loginScreen';
import ComplainList from './screens/complainList';
import ComplainScreen from './screens/complainScreen';


const AppStackMain =  StackNavigator({
  Login:{
      screen: LoginScreen,
      navigationOptions: {
          header: () => null,
      }
  },
  ComplainList:{
    screen: ComplainList,
    navigationOptions: {
        header: () => null,
    }
  },
  ComplainScreen:{
    screen: ComplainScreen,
    navigationOptions: {
        header: () => null,
    }
  },
},
{
  // headerMode: 'none',
  // mode: 'modal',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  }),
});

export default class App extends Component {
  render() {
    return (
      <AppStackMain />
    );
  }
}