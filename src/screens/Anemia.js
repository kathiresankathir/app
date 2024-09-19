import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const Anemia = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Managing Anemia During Pregnancy</Text>

      <View style={styles.section}>
        <Text style={styles.subheader}>Do's:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Get Regular Prenatal Care:</Text>
          <Text style={styles.description}>
            Schedule and attend regular prenatal appointments to monitor hemoglobin levels and overall health.
          </Text>
          <Text style={styles.listItem}>2. Follow a Balanced Diet:</Text>
          <Text style={styles.description}>
            Consume iron-rich foods such as lean meats, spinach, legumes, and fortified cereals. Include foods high in vitamin C (like citrus fruits) to enhance iron absorption.
          </Text>
          <Text style={styles.listItem}>3. Take Prenatal Vitamins:</Text>
          <Text style={styles.description}>
            Use iron supplements as recommended by your healthcare provider. Prenatal vitamins often contain additional iron.
          </Text>
          <Text style={styles.listItem}>4. Stay Hydrated:</Text>
          <Text style={styles.description}>
            Drink plenty of fluids, as proper hydration supports overall health and helps in managing anemia.
          </Text>
          <Text style={styles.listItem}>5. Monitor Symptoms:</Text>
          <Text style={styles.description}>
            Keep track of symptoms like fatigue, dizziness, and paleness. Report any new or worsening symptoms to your healthcare provider.
          </Text>
          <Text style={styles.listItem}>6. Educate Yourself:</Text>
          <Text style={styles.description}>
            Learn about anemia and its effects during pregnancy to better understand your condition and how to manage it.
          </Text>
          <Text style={styles.listItem}>7. Get Enough Rest:</Text>
          <Text style={styles.description}>
            Ensure you are getting adequate sleep and rest, as fatigue can be exacerbated by anemia.
          </Text>
          <Text style={styles.listItem}>8. Discuss Treatment Options:</Text>
          <Text style={styles.description}>
            Consult your healthcare provider about the best treatment plan for your specific type of anemia.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Don'ts:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Don’t Ignore Symptoms:</Text>
          <Text style={styles.description}>
            Do not ignore symptoms of anemia, such as severe fatigue or shortness of breath. Seek medical advice promptly.
          </Text>
          <Text style={styles.listItem}>2. Avoid Self-Medicating:</Text>
          <Text style={styles.description}>
            Do not take iron supplements or any other medications without a doctor’s recommendation, as excessive iron can be harmful.
          </Text>
          <Text style={styles.listItem}>3. Don’t Skip Prenatal Appointments:</Text>
          <Text style={styles.description}>
            Missing prenatal visits can delay the detection and treatment of anemia and other complications.
          </Text>
          <Text style={styles.listItem}>4. Avoid Foods that Inhibit Iron Absorption:</Text>
          <Text style={styles.description}>
            Reduce intake of foods and beverages that can interfere with iron absorption, such as coffee, tea, and high-calcium foods, especially around mealtime.
          </Text>
          <Text style={styles.listItem}>5. Don’t Overlook Follow-Up Tests:</Text>
          <Text style={styles.description}>
            If your doctor orders follow-up blood tests or additional screenings, make sure to complete them as recommended.
          </Text>
          <Text style={styles.listItem}>6. Avoid Extreme Diets:</Text>
          <Text style={styles.description}>
            Do not follow extreme or restrictive diets that may lack essential nutrients needed for anemia management.
          </Text>
          <Text style={styles.listItem}>7. Don’t Rely Solely on Supplements:</Text>
          <Text style={styles.description}>
            Supplements are important, but they should complement a balanced diet rather than replace it.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Effects of Anemia During Pregnancy</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>For the Mother:</Text>
          <Text style={styles.description}>
            - Increased risk of fatigue, weakness, and dizziness.
            - Greater likelihood of complications such as preterm birth, low birth weight, and postpartum depression.
            - Potential need for blood transfusions in severe cases.
          </Text>
          <Text style={styles.listItem}>For the Baby:</Text>
          <Text style={styles.description}>
            - Higher risk of preterm birth, low birth weight, and developmental delays.
            - Potential for iron deficiency in the newborn, which can affect cognitive and physical development.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  list: {
    marginLeft: 8,
  },
  listItem: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default Anemia;
