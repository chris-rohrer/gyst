import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';

import { Buttons, Typography, Spacing } from '../styles/index';

function About({navigation}) {
  return (
    <View style={Spacing.Container}>
       <Text style={Typography.H1}>About</Text>
       <Text style={[Typography.Body, {marginHorizontal: 35, marginBottom: 15}]}>
         Thank you for taking your time and testing this app. Check out the roadmap to see what features I am working on, or look at the entire code on GitHub. {"\n\n"}
         Feel free to contact me.
       </Text>
      <TouchableOpacity style={ Buttons.Button } onPress={() => navigation.navigate('Roadmap')}>
          <Text style={Typography.Button}>Roadmap</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ Buttons.Button } onPress={ ()=>{ Linking.openURL('https://github.com/chris-rohrer/gyst')}}>
          <Text style={Typography.Button}>Source Code</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ Buttons.Button } onPress={ ()=>{ Linking.openURL('https://chrisrohrer.dev')}}>
          <Text style={Typography.Button}>Developer</Text>
        </TouchableOpacity>

      <TouchableOpacity style={ Buttons.Button } onPress={ ()=>{ Linking.openURL('mailto:somethingemail@gmail.com?subject=abcdefg')}}>
        <Text style={Typography.Button}>Mail</Text>
      </TouchableOpacity>
    </View>
  );
}

export default About;