import React, {Component} from "react";
import withObservables from "@nozbe/with-observables";
import { ScrollView, Animated, StyleSheet, View, Text, TouchableOpacity, I18nManager } from "react-native";

import { useNavigation } from '@react-navigation/native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

function TransactionsList ({ transactions }) {
    const navigation = useNavigation();

    updateRef = ref => {
      this._swipeableRow = ref;
    };
    close = () => {
      this._swipeableRow.close();
    };

    renderLeftActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={styles.leftAction} onPress={this.close}>
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
    };

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
            style={[styles.rightAction, { backgroundColor: color }]}
            onPress={pressHandler}>
            <Text style={styles.actionText}>{text}</Text>
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
            {transactions.map(transaction => (
              <Swipeable
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

const createTransaction = async(database, data) => {

    const transactionsCollection = database.get('transactions')
    const newTransaction = await transactionsCollection.create(transaction => {
        transaction.title = data.title
        transaction.amount = data.amount
        transaction.currency = data.currency
        transaction.date = data.date
    })
}

// withObservables is HOC(Higher Order Component) to make any React component reactive.
const enhance = withObservables(["transactions"],({ database }) => ({
    transactions: database.collections.get("transactions").query().observe()
  }));

  const Transaction = ({ transaction }) => (
    <View style={styles.label}>
      <Text style={{flex: 1 }}> {transaction.title}</Text>
      <Text style={{flex: 1, textAlign: 'right'}}> {transaction.amount} {transaction.currency}</Text>
    </View>
  )
  
  const enhanceTransaction = withObservables(['transaction'], ({ transaction }) => ({
    transaction
  }))

  const EnhancedTransaction = enhanceTransaction(Transaction)

  const styles = StyleSheet.create({
    label: {
      flexDirection: "row",
      backgroundColor: '#F7F7F7',
      alignSelf: 'stretch',
      padding: 15,
      margin: 5,
      borderRadius: 4,
    },

    leftAction: {
      flex: 1,
      backgroundColor: '#497AFC',
      justifyContent: 'center',
    },
    actionText: {
      fontSize: 16,
      backgroundColor: 'transparent',
      padding: 10,
    },
    rightAction: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  })

export default enhance(TransactionsList);