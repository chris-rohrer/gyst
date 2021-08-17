import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, Modal, Pressable } from 'react-native';
import DatabaseContext from '../database/context';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

  function DetailsScreen({navigation, route}) {

    const database = React.useContext(DatabaseContext);
    const [currencyVisible, setCurrencyVisible] = useState(false);
    const [dateVisible, setDateVisible] = useState(false);

    const [title, setTitle] = useState("Title");
    const [amount, setAmount] = useState("100");
    const [date, setDate] = useState(new Date);
    const [currency, setCurrency] = useState("CHF");

    const [isIncome, setIsIncome] = useState(false);
    const toggleSwitch = () => {setIsIncome(previousState => !previousState)};


  const createEntry = async () => {
    try {
      // Make new Transaction
      await database.write(async () => {
        const transactionsCollection = database.get('transactions')
        await transactionsCollection.create(transaction => {
          transaction.title = title;
          if(isIncome) {transaction.amount = Number(amount)}
          else {transaction.amount = Number(amount)*(-1)}
          transaction.currency = currency;
          transaction.date = date;
        })
        navigation.goBack()
      })
    } catch (e) {
      alert(e)
    }
  }

  function returnTransactionType() {
    if(isIncome){ return "Income" } else { return "Expense"}
  }


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ flexDirection: 'row'}}>
        <Text>{returnTransactionType()}</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={isIncome ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isIncome}
      />
      </View>

        <TextInput style={styles.input}
        onChangeText={(text) => setTitle(text)}
        defaultValue = {title}
        />

        <TextInput style={styles.input}
        keyboardType = 'numeric'
        returnKeyType={ 'done' }
        onChangeText={(text) => setAmount(text)}
        defaultValue = {amount}
        />

        <Modal
        animationType="slide"
        transparent={true}
        visible={currencyVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setCurrencyVisible(!currencyVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <Picker selectedValue={currency} style={{height: 250, width: 250}} onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
            <Picker.Item label="CHF" value="CHF" />
            <Picker.Item label="EUR" value="EUR" />
            </Picker>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setCurrencyVisible(!currencyVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={dateVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setDateVisible(!dateVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <DatePicker
            date={date}
            onDateChange={(new_date) => setDate(new_date)}
            mode={'date'}
            locale={'en-gb'}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setDateVisible(!dateVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Button title={currency} onPress={() => setCurrencyVisible(true)}/>

      <Button title={'' + date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear()} onPress={() => setDateVisible(true)}/>
  
        <Button
          title="Save"
          onPress={() => createEntry()}/>
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
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  export default DetailsScreen;