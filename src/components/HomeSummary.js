import React, { useState } from "react";
import withObservables from "@nozbe/with-observables";
import { StyleSheet, Text, View } from "react-native";
import {Typography} from '../styles'

function HomeSummary ({transactions}) {

    var sum = 0;
    transactions.map(transaction => (
            sum = sum+transaction.amount)
    )

    sum = sum.toFixed(2)

    return(
        <View style={[styles.toppanel, {paddingBottom: 0}]}>
            <Text style={Typography.Emphasis}>SUMMARY</Text>
            <Text style={[Typography.H2, {margin: 0}]}>{sum} CHF</Text>
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
