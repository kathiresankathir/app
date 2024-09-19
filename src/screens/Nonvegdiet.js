import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import RnIncrementDecrementBtn from './RnIncrementDecrementBtn';
import { AntDesign } from '@expo/vector-icons';

const Nonvegdiet = ({ navigation, route }) => {
  // Set initial state for quantities
  const [quantities, setQuantities] = useState({
    ChickenLiver: 0,
    BeefLiver: 0,
    Oysters: 0,
    Mussels: 0,
    TurkeyDarkMeat: 0,
    PorkLean: 0,
    SardinesCannedInOil: 0,
    Salmon: 0,
  });

  // Food data with iron and calorie content
  const foodData = {
    ChickenLiver: { ironContentPer100g: 9, caloriesPer100g: 172 },
    BeefLiver: { ironContentPer100g: 6.5, caloriesPer100g: 135 },
    Oysters: { ironContentPer100g: 6.12, caloriesPer100g: 68 },
    Mussels: { ironContentPer100g: 6.72, caloriesPer100g: 172 },
    TurkeyDarkMeat: { ironContentPer100g: 2.3, caloriesPer100g: 208 },
    PorkLean: { ironContentPer100g: 1.1, caloriesPer100g: 143 },
    SardinesCannedInOil: { ironContentPer100g: 2.8, caloriesPer100g: 208 },
    Salmon: { ironContentPer100g: 0.6, caloriesPer100g: 208 }, // Custom calorie value for Salmon
  };

  // Calculate total calories for a specific food
  const calculateTotalCalories = (caloriesPer100g, quantity) => {
    return (caloriesPer100g * quantity).toFixed(2);
  };

  // Handle changes in food quantities
  const handleQuantityChange = (food, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [food]: newQuantity,
    }));
  };

  // Calculate total calories for non-veg items
  const totalCaloriesNonVeg = Object.keys(foodData).reduce((total, food) => {
    return total + (foodData[food].caloriesPer100g * quantities[food]);
  }, 0);

  // Prepare chart data for navigation
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

  const navigateToGraphPage = () => {
    const chartData = prepareChartData();
    navigation.navigate('Graphpage', {
      dietType: 'Non-Veg',
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
        <Text style={styles.txts}>Non-Veg</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Nutsdiet')}>Nuts</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Fruitsdiet')}>Fruits</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {Object.keys(foodData).map((food) => (
            <View style={styles.container1} key={food}>
              <View>
                <Text style={styles.txt}>{food.replace(/([A-Z])/g, ' $1').trim()}: </Text>
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
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={navigateToGraphPage} style={styles.card}>
          <Text style={{ fontSize: 20 }}>View calories</Text>
          <Text style={{ fontSize: 16, fontStyle: 'italic' }}>View graph with details</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Nonvegdiet;

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
    color: "#fff",
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
    color: "#F07110",
  },
  totalCaloriesContainer: {
    backgroundColor: '#119988',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
