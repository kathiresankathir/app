import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;

const GraphPage = ({ route }) => {
  // Get the chartData from the route parameters
  const { chartData } = route.params;

  // State to hold the selected item details
  const [selectedItem, setSelectedItem] = useState(null);

  // Predefined colors for the chart items
  const colors = [
    '#FF5733', // Orange
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33A1', // Pink
    '#F1C40F', // Yellow
    '#8E44AD', // Purple
    '#E67E22', // Brown
    '#2ECC71', // Light Green
  ];

  // Ensure the chartData has the same length as the colors array
  const dataWithColors = chartData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length], // Use colors cyclically
  }));

  // Calculate the total calories
  const totalCalories = chartData.reduce((sum, item) => sum + item.calories, 0);

  // Function to handle item press
  const handlePress = (entry) => {
    const { name, calories } = entry;
    setSelectedItem({ name, calories });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Calories by Item</Text>
      <PieChart
        data={dataWithColors}
        width={screenWidth - 40}
        height={250}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          propsForLabels: { display: 'none' }, // Hide labels in the chart
        }}
        accessor="calories"
        backgroundColor="transparent"
        paddingLeft="50"
        absolute
        onPress={(entry) => handlePress(entry)}
        hasLegend={false} // Disable the built-in legend
      />
      
      <View style={styles.legendContainer}>
        {dataWithColors.map((item) => (
          <View key={item.name} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}: {item.calories} cal</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalCaloriesContainer}>
        <Text style={styles.totalCaloriesText}>Total Calories: {totalCalories} cal</Text>
      </View>
    </View>
  );
};

export default GraphPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  totalCaloriesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
  },
  totalCaloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  legendContainer: {
    marginTop: 20,
    width: screenWidth - 100,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});
