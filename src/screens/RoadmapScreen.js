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
       <Text style={styles.h1}>Roadmap</Text>


    </View>
  );
}

export default AboutScreen;