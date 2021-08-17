import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, Modal, Pressable } from 'react-native';
import DatabaseContext from '../database/context';
import withObservables from "@nozbe/with-observables";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

  function DetailsScreen({navigation, route}) {

    const database = React.useContext(DatabaseContext);
    var data = route.params.data;
    const [currencyVisible, setCurrencyVisible] = useState(false);
    const [dateVisible, setDateVisible] = useState(false);

    const [title, setTitle] = useState(data.title);
    const [amount, setAmount] = useState(Math.abs(data.amount).toString());
    const [currency, setCurrency] = useState(data.currency);

    const [isEnabled, setIsEnabled] = useState(data.amount>0);
    const toggleSwitch = () => {setIsEnabled(previousState => !previousState), updateAmount(amount*-1, data)};

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

  const updateDate = async (new_date, entry) => {
    await database.write(async () => {
      await entry.update(transaction => {
        transaction.date = new_date
      })
    })
  }

  const deleteEntry = async (transaction) => {
    await database.write(async () => {
      await transaction.destroyPermanently() // permanent
      navigation.goBack()
    })
    
  }

  function isIncome() {
    if(isEnabled){ return "Income" } else { return "Expense"}
  }

  const Data = ({ data }) => (
    <View>
      <Text>Name: {data.title}</Text>
      <Text>Amount: {data.amount}</Text>
      <Text>Currency: {data.currency}</Text>
      <Text>Date: {data.date.getDate()} - {data.date.getMonth() + 1} - {data.date.getFullYear()}</Text>
    </View>
  )
  
  const enhanceData = withObservables(['data'], ({ data }) => ({
    data
  }))
  
  const EnhancedData = enhanceData(Data)


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ flexDirection: 'row'}}>
        <Text>{isIncome()}</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>

        <TextInput style={styles.input}
        onChangeText={(text) => setTitle(text)}
        onBlur={() => updateTitle(title, data)}
        defaultValue = {data.title}
        />

        <TextInput style={styles.input}
        keyboardType = 'numeric'
        returnKeyType={ 'done' }
        onChangeText={(text) => setAmount(text)}
        onBlur={() => updateAmount(amount, data)}
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
            
            <Picker selectedValue={currency} style={{height: 250, width: 250}} onValueChange={(itemValue, itemIndex) => updateCurrency(itemValue, data)}>
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
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <DatePicker
            date={data.date}
            onDateChange={(new_date) => updateDate(new_date, data)}
            mode={'date'}
            locale={"en-gb"}
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

      <Button title={'' + data.date.getDate() + " - " + (data.date.getMonth() + 1) + " - " + data.date.getFullYear()} onPress={() => setDateVisible(true)}/>

      <Button title="Delete" onPress={() => deleteEntry(data)}/>
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