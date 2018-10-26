import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import AppContainer
import AppNavigator from "./src/containers/AppNavigator";

export default class App extends React.Component {
  render() {
    // Return AppContainer
    return <AppNavigator />;
  }
}
