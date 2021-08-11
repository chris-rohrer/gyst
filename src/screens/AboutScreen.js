import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../styles/index';

function AboutScreen({navigation}) {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
       <Text style={styles.h1}>About</Text>
      <TouchableOpacity style={ styles.button } onPress={() => navigation.navigate('Roadmap')}>
          <Text style={styles.buttontext}>Roadmap</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ styles.buttonOFF}>
          <Text style={styles.buttontext}>Source Code</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ styles.buttonOFF}>
          <Text style={styles.buttontext}>Developer</Text>
        </TouchableOpacity>

    </View>
  );
}

export default AboutScreen;