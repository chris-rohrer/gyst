import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import DatabaseContext from '../database/context';
import withObservables from "@nozbe/with-observables";
import {Picker} from '@react-native-picker/picker';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

  function DetailsScreen({navigation, route}) {

    const database = React.useContext(DatabaseContext);
    var data = route.params.data;
    const isNew = route.params.isNew;
    const type = route.params.type;

    const [title, setTitle] = useState("Generated Title");
    const [amount, setAmount] = useState(100);
    const [date, setDate] = useState();

    /* Currency Picker Code */
    const [currency, setCurrency] = useState();
    /* Currency End */

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const updateTitle = async (new_title, entry) => {
    await database.write(async () => {
      await entry.update(transaction => {
        transaction.title = new_title
      })
    })
  }

  const updateAmount = async (new_amount, entry) => {
    await database.write(async () => {
      await entry.update(transaction => {
        if(isEnabled){
        transaction.amount = Number(new_amount)
      } else {
        transaction.amount = Number(-new_amount)
      }
      })
    })
  }

  const updateCurrency = async (new_currency, entry) => {
    setCurrency(new_currency)
    await database.write(async () => {
      await entry.update(transaction => {
        transaction.currency = new_currency
      })
    })
  }

  const deleteEntry = async (transaction) => {
    await database.write(async () => {
      await transaction.destroyPermanently() // permanent
      navigation.goBack()
    })
    
  }

  const createEntry = async (transaction) => {
    try {
      // Make new Transaction
      await database.write(async () => {
        const transactionsCollection = database.get('transactions')
        const newTransaction = await transactionsCollection.create(transaction => {
          transaction.title = title;
          transaction.amount = amount;
          transaction.currency = currency;
          transaction.date = new Date;
        })
        navigation.goBack()
      })
    } catch (e) {
      alert(e)
    }
  }

  const Data = ({ data }) => (
    <View>
      <Text>Name: {data.title}</Text>
      <Text>Amount: {data.amount}</Text>
      <Text>Currency: {data.currency}</Text>
      <Text>Date: {data.date.getDate()} - {data.date.getMonth() + 1} - {data.date.getFullYear()}</Text>
      <Text>Income: {isEnabled.toString()}</Text>
    </View>
  )
  
  const enhanceData = withObservables(['data'], ({ data }) => ({
    data
  }))
  
  const EnhancedData = enhanceData(Data)

  function getData() {
    if (!isNew) {
      return <EnhancedData data={data} />
    } else {
      return <Text>Create a new transaction...</Text>
    }
  }

  function getButton() {
    if(isNew) {
      return(
        <TouchableOpacity style={ styles.button} onPress={() => createEntry(data)}>
        <Text style={{color: 'white'}}>Save</Text>
        </TouchableOpacity>)
    } else {
      return(
      <TouchableOpacity style={ styles.button} onPress={() => deleteEntry(data)}>
      <Text style={{color: 'white'}}>Delete</Text>
      </TouchableOpacity>)
    }
  }


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details for Transaction:</Text>

        <View style = {{backgroundColor: "grey"}}>
               {getData()}            
        </View>

        <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

        <TextInput style={styles.input}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => updateTitle(title, data)}
        defaultValue = {"Title"}
        />

        <TextInput style={styles.input}
        keyboardType = 'numeric'
        returnKeyType={ 'done' }
        onChangeText={(text) => setAmount(text)}
        onSubmitEditing={() => updateAmount(amount, data)}
        defaultValue = {"100"}
        />

        <Picker selectedValue={currency} style={{height: 250, width: 250}}  onValueChange={(itemValue, itemIndex) => updateCurrency(itemValue, data)}>
          <Picker.Item label="CHF" value="CHF" />
          <Picker.Item label="EUR" value="EUR" />
        </Picker>

        {getButton()}

        <Button title="Go back" onPress={() => navigation.goBack()} />
  
        <Button
          title="Go home"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
  
    input: {
      borderWidth: 1,
      borderColor: 'black',
      alignSelf: 'stretch',
      marginHorizontal: 32,
      marginVertical: 6,
      paddingHorizontal: 20,
      height: 45,
      borderRadius: 6
    },
  
    button: {
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginHorizontal: 32,
      marginVertical: 6,
      borderRadius: 6,
    },
  
    h1: {
      fontSize: 50,
      margin: 50
    }
  });

  export default DetailsScreen;