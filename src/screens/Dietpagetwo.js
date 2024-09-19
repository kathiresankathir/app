import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import RnIncrementDecrementBtn from './RnIncrementDecrementBtn';
import { AntDesign } from '@expo/vector-icons';

const Dietpagetwo = ({ navigation }) => {
  const [quantities, setQuantities] = useState({
    Spinach: 0,
    Lentils: 0,
    Chickpeas: 0,
    Soybeans: 0,
    Pumpkin: 0,
    Sesame: 0,
    Beetroot: 0,
    Jaggery: 0,
  });

  const foodData = {
    Spinach: { ironContentPer100g: 3.2, caloriesPer100g: 23 },
    Lentils: { ironContentPer100g: 3.5, caloriesPer100g: 160 },
    Chickpeas: { ironContentPer100g: 7, caloriesPer100g: 360 },
    Soybeans: { ironContentPer100g: 15.7, caloriesPer100g: 360 },
    Pumpkin: { ironContentPer100g: 8.8, caloriesPer100g: 559 },
    Sesame: { ironContentPer100g: 14.6, caloriesPer100g: 573 },
    Beetroot: { ironContentPer100g: 0.8, caloriesPer100g: 360 },
    Jaggery: { ironContentPer100g: 11, caloriesPer100g: 383 },
  };

  const calculateTotalCalories = (caloriesPer100g, quantity) => {
    return (caloriesPer100g * quantity).toFixed(2);
  };

  const handleQuantityChange = (food, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [food]: newQuantity,
    }));
  };

  // Prepare chart data based on selected diet type
  const prepareChartData = () => {
    return Object.keys(foodData).map((food) => {
      const calories = calculateTotalCalories(foodData[food].caloriesPer100g, quantities[food]);
      return {
        name: food,
        calories: parseFloat(calories),
        color: '#FF5733',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    });
  };

  const navigateToGraphPage = (dietType) => {
    const chartData = prepareChartData();
    navigation.navigate('Graphpage', {
      dietType,
      chartData,
    });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.back}>
        <AntDesign onPress={() => navigation.navigate('Dietpage')} name="arrowleft" size={24} color="black" />
        <Text style={styles.txt}>Back</Text>
      </View> */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Choose your Diet plan</Text>
      </View> */}
      <View style={styles.options}>
        <Text style={styles.txts} >Veg</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Nonvegdiet')}>Non-Veg</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Nutsdiet')}>Nuts</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Fruitsdiet')}>Fruits</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {Object.keys(foodData).map((food) => (
            <View style={styles.container1} key={food}>
              <View>
                <Text style={styles.txt}>{food}:</Text>
                <View style={styles.txtbox2}>
                  <Text>Iron content: {foodData[food].ironContentPer100g} mg</Text>
                  <Text>Calories: {foodData[food].caloriesPer100g} cal/100g</Text>
                  <Text style={styles.txtt}>Total calories: {calculateTotalCalories(foodData[food].caloriesPer100g, quantities[food])} cal</Text>
                </View>
              </View>
              <View>
                <RnIncrementDecrementBtn
                  val={quantities[food]}
                  minVal={0}
                  max={100}
                  handleClick={(newQuantity) => handleQuantityChange(food, newQuantity)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigateToGraphPage('veg')} style={styles.card}>
        <Text style={{ fontSize: 20 }}>View calories</Text>
        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>View graph with details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dietpagetwo;

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
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
  },
  back: {
    padding: 15,
    backgroundColor: "#119988",
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  txtt: {
    fontSize: 16,
    color: "#F07110",
  },
});
