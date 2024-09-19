import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import RnIncrementDecrementBtn from './RnIncrementDecrementBtn';
import { AntDesign } from '@expo/vector-icons';

const Fruitsdiet = ({ navigation }) => {
  const [quantities, setQuantities] = useState({
    Apricots: 0,
    Raisins: 0,
    "Prunes (Dried plums)": 0,
    Dates: 0,
    Mulberries: 0,
    Pomegranate: 0,
    Guava: 0,
    Watermelon: 0,
  });

  const fruitData = {
    Apricots: { ironContentPer100g: 2.66, caloriesPer100g: 241 },
    Raisins: { ironContentPer100g: 1.88, caloriesPer100g: 299 },
    "Prunes (Dried plums)": { ironContentPer100g: 0.93, caloriesPer100g: 240 },
    Dates: { ironContentPer100g: 0.90, caloriesPer100g: 282 },
    Mulberries: { ironContentPer100g: 1.85, caloriesPer100g: 43 },
    Pomegranate: { ironContentPer100g: 0.3, caloriesPer100g: 83 },
    Guava: { ironContentPer100g: 0.73, caloriesPer100g: 68 },
    Watermelon: { ironContentPer100g: 0.24, caloriesPer100g: 30 },
  };

  const calculateTotalCalories = (caloriesPer100g, quantity) => {
    return (caloriesPer100g * quantity).toFixed(2);
  };

  const handleQuantityChange = (fruit, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [fruit]: newQuantity,
    }));
  };

  const totalCaloriesFruits = Object.keys(fruitData).reduce((total, fruit) => {
    return total + fruitData[fruit].caloriesPer100g * quantities[fruit];
  }, 0);

  const navigateToGraphPage = () => {
    const chartData = Object.keys(fruitData).map((fruit) => {
      const calories = calculateTotalCalories(fruitData[fruit].caloriesPer100g, quantities[fruit]);
      return {
        name: fruit,
        calories: parseFloat(calories),
        color: '#FF5733',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    });
    navigation.navigate('Graphpage', {
      dietType: 'Fruits',
      chartData,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <AntDesign onPress={() => navigation.navigate('Dietpage')} name="arrowleft" size={24} color="black" />
        {/* <Text style={styles.txt}>Back</Text> */}
      </View>
      {/*<View style={styles.header}>
        <Text style={styles.headerText}>Choose your Diet plan</Text>
      </View>*/}
      <View style={styles.options}>
        <Text style={styles.txt} onPress={() => navigation.navigate('Dietpagetwo')}>Veg</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Nonvegdiet')}>Non-Veg</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Nutsdiet')}>Nuts</Text>
        <Text style={styles.txts}>Fruits</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {Object.keys(fruitData).map((fruit) => (
            <View style={styles.container1} key={fruit}>
              <View>
                <Text style={styles.txt}>{fruit}:</Text>
                <View style={styles.txtbox2}>
                  <Text>Iron content: {fruitData[fruit].ironContentPer100g} mg</Text>
                  <Text>Calories: {fruitData[fruit].caloriesPer100g} cal/100g</Text>
                  <Text style={styles.txtt}>
                    Total calories: {calculateTotalCalories(fruitData[fruit].caloriesPer100g, quantities[fruit])} cal
                  </Text>
                </View>
              </View>
              <View>
                <RnIncrementDecrementBtn
                  val={quantities[fruit]}
                  minVal={0}
                  max={100}
                  handleClick={(newQuantity) => handleQuantityChange(fruit, newQuantity)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={navigateToGraphPage} style={styles.card}>
          <Text style={{ fontSize: 20 }}>View calories</Text>
          <Text style={{ fontSize: 16, fontStyle: 'italic' }}>View graph with details</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Fruitsdiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#119988',
    padding: 10,
    // marginTop:10,
  },
  // cardContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  card: {
    flexDirection: 'column',
    backgroundColor: '#119988',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 15,
    justifyContent:'center',
    alignItems:'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    flexDirection: 'column',
    gap: 5,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#d9dddd',
    borderRadius: 15,
    marginBottom: 10,
  },
  txtbox2: {
    fontSize: 16,
    marginTop: 3,
  },
  txts: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  back: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  txtt: {
    fontSize: 16,
    color: '#F07110',
  },
});
