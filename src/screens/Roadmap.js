import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {Typography, Spacing} from '../styles'

function Roadmap({navigation}) {
  return (
    <View style={Spacing.Container}>
       <Text style={Typography.H1}>Roadmap</Text>
       <Text style={[Typography.Body,{marginHorizontal:35}]}>
        This app is starting out as a personal finance tool, with the vision of becoming a more extensive planing and tracking tool for small businesses.{"\n"}{"\n"}
        - Transactions (Filter/Sort/Recurring/Monthly/...){"\n"}
        - Time Tracking (Non-/Billable/Pricing/...){"\n"}
        - Projects (Combine Time {"\&"} Transactions/...){"\n"}
        - Todos (){"\n"}
       </Text>
    </View>
  );
}

export default Roadmap;