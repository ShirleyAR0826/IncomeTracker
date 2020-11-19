import React, {useState, useEffect} from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import moment from 'moment';

import colors from './config';

const App = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    {date: moment().format('LL'), amount: 2000},
    {date: moment().subtract(1, 'days').format('LL'), amount: 2500},
    {date: moment().subtract(1, 'days').format('LL'), amount: 2500},
    {date: moment().subtract(1, 'days').format('LL'), amount: 2500},
    {date: moment().subtract(2, 'days').format('LL'), amount: 3500},
    {date: moment().subtract(3, 'days').format('LL'), amount: 4500},
    {date: moment().subtract(4, 'days').format('LL'), amount: 5500},
  ]);
  const [transformedData, setTransformedData] = useState([]);
  const [dates, setDates] = useState([]);
  const [amounts, setAmounts] = useState([]);

  const groupBy = (array, key) => 
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const [gigs, setGigs] = useState([
    {
      description: 'Freelance Job with Qazi',
      amount: 499.99,
      timestamp: new Date(),
    }
  ]);

  const getDates = (dataset) => dataset.map(pair => pair.date);
  const getAmounts = (dataset) => dataset.map(pair => pair.amount);
  const transformData = (groupedData) => {
    const transformedArray = [];
    Object.entries(groupedData).forEach(entry => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({date: entry[0], amount: total});
    });
    return transformedArray;
  }

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, "date")));
    setDates(getDates(transformedData));
    setAmounts(getAmounts(transformedData));
  }, [data]);

  const addGig = () => {
    setGigs (
      [...gigs, {
          description: description,
          amount: amount}
    ]);
    setDescription('');
    setAmount('');
  }

  console.log("App Rendered");

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
            labels: dates,
            datasets: [
              {
                data: amounts,
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
            decimalPlaces: null, // optional, defaults to 2dp
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
      <Text style={styles.header}>Total Income: ${total}</Text>
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
      <Text style={styles.header}>Your Gig History</Text>
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
    margin: 15,
    padding: 15,
    height: 45,
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
    color: colors.palette1,
    padding: 5,
    alignSelf: "center"
  }
});

export default App;
