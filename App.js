// Import React Components
import React from 'react';

// Import Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import Home from './src/screens/Home';
import Transactions from './src/screens/Transactions';
import Details from './src/screens/Details';
import NewTransaction from './src/screens/NewTransaction';
import About from './src/screens/About';
import Roadmap from './src/screens/Roadmap';

// Watermelon DB
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './src/database/schema';
import migrations from './src/database/migrations'
import { dbModels } from './src/database';
import DatabaseContext from './src/database/context';

// Import Styles
import { Colors } from './src/styles'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // optional database name or file system path
  // dbName: 'myapp',
  // optional migrations
  //migrations,
  // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
  jsi: true,
  // experimental JSI mode, a more advanced version of synchronous: true
  // experimentalUseJSI: true,
  // Optional, but you should implement this method:
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: dbModels,
  //actionsEnabled: true,
})

export default function App({navigation}) {
  const Stack = createStackNavigator()

  return (
    <DatabaseContext.Provider value={database}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='Details' component={Details} options={{headerStyle: {backgroundColor:Colors.Header, shadowColor: 'transparent'}, headerTitleStyle: { color: Colors.Font}}} />
        <Stack.Screen name='New' component={NewTransaction} options={{headerStyle: {backgroundColor:Colors.Header, shadowColor: 'transparent'}, headerTitleStyle: { color: Colors.Font}}} />
        <Stack.Screen name='About' component={About} options={{headerStyle: {backgroundColor:Colors.Header, shadowColor: 'transparent'}, headerTitleStyle: { color: Colors.Font}}} />
        <Stack.Screen name='Transactions' component={Transactions} options={{headerStyle: {backgroundColor:Colors.Header, shadowColor: 'transparent'}, headerTitleStyle: { color: Colors.Font}}} />
        <Stack.Screen name='Roadmap' component={Roadmap} />
      </Stack.Navigator>
    </NavigationContainer>
    </DatabaseContext.Provider>
  ); 
}