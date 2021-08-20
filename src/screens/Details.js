import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, Modal, Pressable } from 'react-native';
import DatabaseContext from '../database/context';
import withObservables from "@nozbe/with-observables";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import Styles, { Spacing, Typography, Buttons, Colors  } from'../styles'

  function Details({navigation, route}) {

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
      <View style={Spacing.Container}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 'auto'}}>
        <Text style={Typography.H3}>{isIncome()}</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>

        <Text style={[{alignSelf:'flex-start', marginHorizontal: 35}, Typography.Emphasis]}>Title</Text>
        <TextInput style={[Styles.input, Typography.H3]}
        onChangeText={(text) => setTitle(text)}
        onBlur={() => updateTitle(title, data)}
        defaultValue = {data.title}
        />
        <Text style={[{alignSelf:'flex-start', marginHorizontal: 35, marginTop: 15}, Typography.Emphasis]}>Amount</Text>
        <TextInput style={[Styles.input, Typography.H3]}
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
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            
            <Picker selectedValue={currency} style={Styles.Picker} itemStyle={Styles.PickerItem} onValueChange={(itemValue, itemIndex) => updateCurrency(itemValue, data)}>
            <Picker.Item label="CHF" value="CHF" />
            <Picker.Item label="EUR" value="EUR" />
            </Picker>

            <Pressable
              style={[Buttons.Button, Buttons.Close]}
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
        }}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            
            <DatePicker
            date={data.date}
            onDateChange={(new_date) => updateDate(new_date, data)}
            mode={'date'}
            locale={"en-gb"}
            textColor={Colors.Font}
            />

            <Pressable
              style={[Buttons.Button, Buttons.Close]}
              onPress={() => setDateVisible(!dateVisible)}
            >
              <Text style={Typography.Modal}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 'auto'}}>
        <Text style={Typography.H3}>Currency:</Text>
        <TouchableOpacity onPress={() => setCurrencyVisible(true)}>
          <Text style={Typography.H3}>{currency}</Text>
        </TouchableOpacity>
      </View>


      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 'auto'}}>
        <Text style={Typography.H3}>Date:</Text>
        <TouchableOpacity  onPress={() => setDateVisible(true)}>
          <Text style={Typography.H3}>{'' + data.date.getDate() + " - " + (data.date.getMonth() + 1) + " - " + data.date.getFullYear()}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[Buttons.Alert]} onPress={() => deleteEntry(data)}>

          <Text style={Typography.Button}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default Details;