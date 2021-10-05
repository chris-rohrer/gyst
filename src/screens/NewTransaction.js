import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, Modal, Pressable } from 'react-native';
import DatabaseContext from '../database/context';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import Styles, { Buttons, Spacing, Typography, Colors } from '../styles';

  function NewTransaction({navigation, route}) {

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
      <View style={Spacing.Container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 'auto'}}>
        <Text style = {Typography.H3}>{returnTransactionType()}</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={isIncome ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isIncome}
      />
      </View>


        <Text style={[{alignSelf:'flex-start', marginHorizontal: 35}, Typography.Emphasis]}>TITLE</Text>
        <TextInput style={[Styles.input, Typography.H4]}
        onChangeText={(text) => setTitle(text)}
        defaultValue = {title}
        />
        <Text style={[{alignSelf:'flex-start', marginHorizontal: 35, marginTop: 15}, Typography.Emphasis]}>AMOUNT</Text>
        <TextInput style={[Styles.input, Typography.H4]}
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
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            
            <Picker selectedValue={currency} style={Styles.Picker} itemStyle={Styles.PickerItem} onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
            <Picker.Item label="CHF" value="CHF" />
            <Picker.Item label="EUR" value="EUR" />
            </Picker>

            <Pressable
              style={[Buttons.Button, Styles.buttonClose]}
              onPress={() => setCurrencyVisible(!currencyVisible)}
            >
              <Text style={Typography.Modal}>Done</Text>
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
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            
            <DatePicker
            date={date}
            onDateChange={(new_date) => setDate(new_date)}
            mode={'date'}
            locale={'en-gb'}
            textColor={Colors.Font}
            />

            <Pressable
              style={[Buttons.Button, Styles.buttonClose]}
              onPress={() => setDateVisible(!dateVisible)}
            >
              <Text style={Typography.Modal}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={[{alignSelf:'flex-start', marginHorizontal: 35, marginTop: 15}, Typography.Emphasis]}>CURRENCY</Text>
        <TouchableOpacity style={{alignSelf: 'stretch'}} onPress={() => setCurrencyVisible(true)}>
          <Text style={[Styles.input, Typography.H4, {paddingTop: 8}]}>{currency}</Text>
        </TouchableOpacity>

      <Text style={[{alignSelf:'flex-start', marginHorizontal: 35, marginTop: 15}, Typography.Emphasis]}>DATE</Text>
      <TouchableOpacity  style={{alignSelf: 'stretch'}} onPress={() => setDateVisible(true)}>
        <Text style={[Styles.input, Typography.H4, {paddingTop: 8}]}>{'' + date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear()}</Text>
      </TouchableOpacity>

        <TouchableOpacity style={[Buttons.Button, {marginTop: 100}]} onPress={() => createEntry()}>
          <Text style={Typography.Button}>Save</Text>
        </TouchableOpacity>

      </View>
    );
  }

  export default NewTransaction;