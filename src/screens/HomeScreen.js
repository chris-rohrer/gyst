// Import React Components
import React from 'react';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';

import DatabaseContext from '../database/context';
import HomeSummary from '../components/HomeSummary';
import styles from '../styles/index';

function HomeScreen({navigation}){

const database = React.useContext(DatabaseContext);
const colorScheme = useColorScheme();
 
    return (
      <View style={styles.container}>
        <HomeSummary database={database}/>
  
        <View style={styles.mainmenu}>
  
        <TouchableOpacity style={ styles.button}onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.buttontext}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.buttonOFF}>
          <Text style={styles.buttontext}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.buttonOFF}>
          <Text style={styles.buttontext}>Time Tracking</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={ styles.button}onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttontext}>About</Text>
        </TouchableOpacity>
  
        </View>
        <Text>Color Scheme: {colorScheme}</Text>
      </View>
    );
  }

  export default HomeScreen;