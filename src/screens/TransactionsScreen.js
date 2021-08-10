import React, { useState, useEffect } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

import TransactionsList from '../components/TransactionsList';
import DatabaseContext from '../database/context';

  function TransactionsScreen({navigation}) {

    const database = React.useContext(DatabaseContext);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

        <Button title="New" onPress={() => navigation.navigate("Details", {data:null, type:"transaction", isNew: true})}/>

        <TransactionsList database={database}/>

        <Button title="Go back" onPress={() => navigation.goBack()} />
  
        <Button
          title="Go home"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  }

  export default TransactionsScreen;