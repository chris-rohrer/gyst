import React from "react";
import withObservables from "@nozbe/with-observables";
import { ScrollView, Animated, View, Text, TouchableOpacity, I18nManager } from "react-native";

import { useNavigation } from '@react-navigation/native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Styles, {Typography} from "../styles";

function TransactionsList ({ transactions }) {
    const navigation = useNavigation();

    updateRef = ref => {
      this._swipeableRow = ref;
    };
    close = () => {
      this._swipeableRow.close();
    };

    /*renderLeftActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={Styles.leftAction} onPress={this.close}>
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }],
              },
            ]}>
            Archive
          </Animated.Text>
        </RectButton>
      );
    }; */

    renderRightAction = (text, color, x, progress) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });
      const pressHandler = () => {
        this.close();
          alert(text);
      };
      return (
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton
            style={[Styles.rightAction, { backgroundColor: color }]}
            onPress={pressHandler}>
            <Text style={Typography.Action}>{text}</Text>
          </RectButton>
        </Animated.View>
      );
    };

    renderRightActions = progress => (
      <View style={{ width: 192, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
        {this.renderRightAction('More', '#C8C7CD', 192, progress)}
        {this.renderRightAction('Flag', '#ffab00', 128, progress)}
        {this.renderRightAction('Delete', '#dd2c00', 64, progress)}
      </View>
    );

    return (
        <ScrollView style={{ alignSelf: "stretch" }}>
            {transactions.map((transaction, index) => (
              <Swipeable key={index}
              ref={this.updateRef}
              friction={2}
              leftThreshold={30}
              rightThreshold={40}
              renderLeftActions={this.renderLeftActions}
              renderRightActions={this.renderRightActions}>
                <TouchableOpacity onPress={() => navigation.navigate("Details", {data:transaction, type:"transaction", new: false})}>
                    <EnhancedTransaction transaction={transaction}/>
                </TouchableOpacity>
              </Swipeable>
            ))}
        </ScrollView>)
}

// withObservables is HOC(Higher Order Component) to make any React component reactive.
const enhance = withObservables(["transactions"],({ database }) => ({
    transactions: database.collections.get("transactions").query().observe()
  }));

  const Transaction = ({ transaction }) => (
    <View style={Styles.label}>
      <Text style={Typography.Modal}> {transaction.title}</Text>
      <Text style={[Typography.Modal,{flex: 1, textAlign: 'right'}]}> {transaction.amount} {transaction.currency}</Text>
    </View>
  )
  
  const enhanceTransaction = withObservables(['transaction'], ({ transaction }) => ({
    transaction
  }))

  const EnhancedTransaction = enhanceTransaction(Transaction)

export default enhance(TransactionsList);