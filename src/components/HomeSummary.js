import React, { useState } from "react";
import withObservables from "@nozbe/with-observables";
import { StyleSheet, Text, View } from "react-native";

function HomeSummary ({transactions}) {

    var sum = 0;
    transactions.map(transaction => (
            sum = sum+transaction.amount)
    )


    return(
        <View style={styles.toppanel}>
            <Text style={styles.h1}>GYST!</Text>
            <Text>Summary</Text>
            <Text style={styles.summary}>{sum} CHF</Text>
        </View>
    )
}

// withObservables is HOC(Higher Order Component) to make any React component reactive.
const enhance = withObservables(["transactions"],({ database }) => ({
    transactions: database.collections.get("transactions").query().observe(),  
  }));


const styles = StyleSheet.create({
  
    h1: {
      fontSize: 50,
      margin: 25,
    },
  
    summary: {
      fontSize: 50,
    },

    toppanel: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 50
    }
  });

export default enhance(HomeSummary)
