import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Buttons } from '../styles'

import { useNavigation } from '@react-navigation/native';

  function TransactionLabel(props) {
    const navigation = useNavigation();

    return (
      <TouchableOpacity style={styles.label} onPress={() => navigation.navigate(props.screenName, {data:props.data})}>
      <Text style={{flex: 1 }}> {props.data.title}</Text>
      <Text style={{flex: 1, textAlign: 'right'}}> {props.data.amount} {props.data.currency}</Text>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    label: {
      flexDirection: "row",
      backgroundColor: '#F7F7F7',
      alignSelf: 'stretch',
      padding: 15,
      margin: 5,
      borderRadius: 10,
    }

  });
  
  export default TransactionLabel;