import React from 'react';
import { Text, View, StyleSheet, Image, StatusBar, SafeAreaView, Platform, Switch } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import firebase from 'firebase';

export default class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
        light_theme: true,
        isUpdated: false
    }
  }

  changeUpdated = () => {
    this.setState({
      isUpdated: true
    });
  }

  removeUpdated = () => {
    this.setState({
      isUpdated: false
    });
  }

  renderFeed = (props) => {
    return (
      <Feed setUpdateToFalse={this.removeUpdated} {...props} />
    );
  }

  renderCreateStory = (props) => {
    return (
      <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />
    );
  }

  render() {
    return (
      <Tab.Navigator
          labeled={false}
          barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                  let iconName;
                  if(route.name === "Feed"){
                      iconName = focused ? "home" : "home-outline";
                  } else if(route.name === "Create Story"){
                      iconName = focused ? "add-circle" : "add-circle-outline";
                  }
                  return (
                      <Ionicons
                          name={iconName}
                          size={RFValue(25)}
                          color={color}
                          style={styles.icons}
                      />
                  );
              }
          })}
          activeColor={"#ee8249"}
          inactiveColor={"gray"}
      >
          <Tab.Screen name="Feed" component={this.renderFeed()} options={{unmountOnBlur: true}} />
          <Tab.Screen name="Create Story" component={this.renderCreateStory()} options={{unmountOnBlur: true}} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "white",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});