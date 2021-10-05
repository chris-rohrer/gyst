import React, { useState, useEffect } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

import TransactionsList from '../components/TransactionsList';
import DatabaseContext from '../database/context';
import { Spacing } from '../styles';

  function Transactions({navigation}) {

    const database = React.useContext(DatabaseContext);

    return (
      <View style={ Spacing.Container}>

        <Button title="New" onPress={() => navigation.navigate("New", {type:"transaction"})}/>

        <TransactionsList database={database}/>

        <View style={{flexDirection: "row"}}>
        <Button
          title="Go home"
          onPress={() => navigation.popToTop()}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>

      </View>
    );
  }

  export default Transactions;