import React, {useState, useEffect} from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";

import colors from './config';

const App = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [gigs, setGigs] = useState([
    {
      description: 'Freelance Job with Qazi',
      amount: 499.99
    }
  ]);

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  const addGig = () => {
    setGigs (
      [...gigs, {
          description: description,
          amount: amount}
    ]);
    setDescription('');
    setAmount('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          Income Tracker
        </Text>
      </View>

      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: colors.palette2,
            backgroundGradientFrom: colors.palette2,
            backgroundGradientTo: colors.palette2,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.palette4
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <Text style={styles.text}>Total Income: {total}</Text>
      <TextInput
        style={styles.input}
        value={description}
        placeholder='Enter a description'
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        value={amount}
        placeholder='Enter the amount earned'
        keyboardType='numeric'
        onChangeText={text => setAmount(text)}
      />
      <Button disabled={!amount && !description} onPress={addGig} title='add Gig'/>
      <Text style={styles.header}>Gig History</Text>
      {gigs.map(gig =>
        <View>
          <Text style={styles.text}>{gig.description}: {gig.amount}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.palette4,
    marginTop: 20,
    color: colors.palette1
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    alignSelf: "center",
    color: colors.palette1
  },
  input: {
    margin: 20,
    padding: 20,
    height: 60,
    borderColor: colors.palette1,
    borderWidth: 1,
    backgroundColor: colors.palette5
  },
  text: {
    color: colors.palette1
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.palette1
  }
});

export default App;
