// Import React Components
import React from 'react';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';

import DatabaseContext from '../database/context';
import HomeSummary from '../components/HomeSummary';
import { Buttons, Typography, Spacing } from '../styles/index';

function Home({navigation}){

const database = React.useContext(DatabaseContext);
const colorScheme = useColorScheme();
 
    return (
      <View style={Spacing.Container}>
        <HomeSummary database={database}/>
  
        <View style={Spacing.Menu}>
  
        <TouchableOpacity style={ Buttons.Button }onPress={() => navigation.navigate('Transactions')}>
          <Text style={Typography.Button}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ Buttons.Disabled}>
          <Text style={Typography.Button}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ Buttons.Disabled}>
          <Text style={Typography.Button}>Time Tracking</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={ Buttons.Button }onPress={() => navigation.navigate('About')}>
          <Text style={Typography.Button}>About</Text>
        </TouchableOpacity>
  
        </View>
        <Text style={Typography.Body}>Color Scheme: {colorScheme}</Text>
      </View>
    );
  }

  export default Home;