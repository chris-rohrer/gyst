import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { Buttons, Typography, Spacing } from '../styles/index';

function AboutScreen({navigation}) {
  return (
    <View style={Spacing.Container}>
       <Text style={Typography.H1}>About</Text>
      <TouchableOpacity style={ Buttons.Button } onPress={() => navigation.navigate('Roadmap')}>
          <Text style={Typography.Button}>Roadmap</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ Buttons.Disabled }>
          <Text style={Typography.Button}>Source Code</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ Buttons.Disabled }>
          <Text style={Typography.Button}>Developer</Text>
        </TouchableOpacity>

    </View>
  );
}

export default AboutScreen;