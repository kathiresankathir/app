import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import RnIncrementDecrementBtn from './RnIncrementDecrementBtn';
import { AntDesign } from '@expo/vector-icons';

const Nutsdiet = ({ navigation, route }) => {
  // const { totalCalories, totalCaloriesNonVeg, totalCaloriesFruits } = route.params;
  const [quantities, setQuantities] = useState({
    Almonds: 0,
    Cashews: 0,
    Pistachios: 0,
    "Wal nuts": 0,
    Hazelnuts: 0,
    "Brazil Nuts": 0,
  });

  const nutData = {
    Almonds: { ironContentPer100g: 3.7, caloriesPer100g: 579 },
    Cashews: { ironContentPer100g: 6.68, caloriesPer100g: 559 },
    Pistachios: { ironContentPer100g: 3.92, caloriesPer100g: 562 },
    "Wal nuts": { ironContentPer100g: 2.91, caloriesPer100g: 654 },
    Hazelnuts: { ironContentPer100g: 4.7, caloriesPer100g: 628 },
    "Brazil Nuts": { ironContentPer100g: 2.43, caloriesPer100g: 656 },
  };

  const calculateTotalCalories = (caloriesPer100g, quantity) => {
    return (caloriesPer100g * quantity).toFixed(2);
  };

  const handleQuantityChange = (nut, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [nut]: newQuantity,
    }));
  };

  // Calculate the sum of total calories
  const totalCaloriesNuts = Object.keys(nutData).reduce((total, nut) => {
    return total + nutData[nut].caloriesPer100g * quantities[nut];
  }, 0);

  const navigateToGraphPage = () => {
    navigation.navigate('Graphpage', {
      dietType: 'Nuts',
      chartData: Object.keys(nutData).map((nut) => ({
        name: nut,
        calories: parseFloat(calculateTotalCalories(nutData[nut].caloriesPer100g, quantities[nut])),
        color: '#FF5733',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      })),
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
        <Text style={styles.txt} onPress={() => navigation.navigate('Dietpagetwo',)}>Veg</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Nonvegdiet', )}>Non-Veg</Text>
        <Text style={styles.txts}>Nuts</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate('Fruitsdiet', )}>Fruits</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {Object.keys(nutData).map((nut) => (
            <View style={styles.container1} key={nut}>
              <View>
                <Text style={styles.txt}>{nut}:</Text>
                <View style={styles.txtbox2}>
                  <Text>Iron content: {nutData[nut].ironContentPer100g} mg</Text>
                  <Text>Calories: {nutData[nut].caloriesPer100g} cal/100g</Text>
                  <Text style={styles.txtt}>
                    Total calories: {calculateTotalCalories(nutData[nut].caloriesPer100g, quantities[nut])} cal
                  </Text>
                </View>
              </View>
              <View>
                <RnIncrementDecrementBtn
                  val={quantities[nut]}
                  minVal={0}
                  max={100}
                  handleClick={(newQuantity) => handleQuantityChange(nut, newQuantity)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={navigateToGraphPage} style={styles.card}>
        <Text style={{ fontSize: 20 }}>View calories</Text>
        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>({totalCaloriesNuts.toFixed(2)}) cal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nutsdiet;

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
