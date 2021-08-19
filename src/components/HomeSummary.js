import React, { useState } from "react";
import withObservables from "@nozbe/with-observables";
import { StyleSheet, Text, View } from "react-native";
import {Typography} from '../styles'

function HomeSummary ({transactions}) {

    var sum = 0;
    transactions.map(transaction => (
            sum = sum+transaction.amount)
    )


    return(
        <View style={styles.toppanel}>
            <Text style={Typography.H1}>GYST!</Text>
            <Text style={Typography.H2}>Summary</Text>
            <Text style={Typography.Summary}>{sum} CHF</Text>
        </View>
    )
}

// withObservables is HOC(Higher Order Component) to make any React component reactive.
const enhance = withObservables(["transactions"],({ database }) => ({
    transactions: database.collections.get("transactions").query().observe(),  
  }));


const styles = StyleSheet.create({

    toppanel: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 50
    }
  });

export default enhance(HomeSummary)
