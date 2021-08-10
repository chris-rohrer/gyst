// Import React Components
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import DatabaseContext from '../database/context';
import HomeSummary from '../components/HomeSummary';
import styles from '../styles/index';

function HomeScreen({navigation}){

const database = React.useContext(DatabaseContext);
 
    return (
      <View style={styles.container}>
        <HomeSummary database={database}/>
  
        <View style={styles.mainmenu}>
  
        <TouchableOpacity style={ styles.button}onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.buttontext}>Transactions</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={ styles.button}onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttontext}>About</Text>
        </TouchableOpacity>
  
        </View>
      </View>
    );
  }

  export default HomeScreen;