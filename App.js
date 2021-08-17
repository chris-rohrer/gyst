// Import React Components
import React from 'react';

// Import Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import NewScreen from './src/screens/NewScreen';
import AboutScreen from './src/screens/AboutScreen';
import RoadmapScreen from './src/screens/RoadmapScreen';

// Watermelon DB
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './src/database/schema';
import migrations from './src/database/migrations'
import { dbModels } from './src/database';
import DatabaseContext from './src/database/context';

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
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Details' component={DetailsScreen} />
        <Stack.Screen name='New' component={NewScreen} />
        <Stack.Screen name='About' component={AboutScreen} />
        <Stack.Screen name='Transactions' component={TransactionsScreen} />
        <Stack.Screen name='Roadmap' component={RoadmapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </DatabaseContext.Provider>
  ); 
}