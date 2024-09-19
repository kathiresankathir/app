import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const HypertensionReport = ({ route }) => {
  const { reportItem } = route.params; // Get the report details from the navigation params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Hypertension Report</Text>
        </View>

        {/* Report Details Section */}
        <View style={styles.reportContainer}>
          {/* Report Date */}
          <View style={styles.section}>
            <Text style={styles.label}>Report Date:</Text>
            <Text style={styles.value}>{new Date(reportItem.date).toLocaleDateString()}</Text>
          </View>

          {/* Symptoms Section */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Symptoms</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Headache:</Text>
              <Text style={styles.value}>{reportItem.Headache ? "Yes" : "No"}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Blurring of Vision:</Text>
              <Text style={styles.value}>{reportItem.Blurringofvision ? "Yes" : "No"}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Epigastric Pain:</Text>
              <Text style={styles.value}>{reportItem.Epigastricpain ? "Yes" : "No"}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Decrease in urine output :</Text>
              <Text style={styles.value}>{reportItem.Urineoutput ? "Yes" : "No"}</Text>
            </View>
          </View>

          {/* Blood Pressure Section */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Blood Pressure</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Systolic BP:</Text>
              <Text style={styles.value}>{reportItem.SystolicBP}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Diastolic BP:</Text>
              <Text style={styles.value}>{reportItem.DiastolicBP}</Text>
            </View>
          </View>

          {/* Medical History Section */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Medical History</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>History of Hypertension:</Text>
              <Text style={styles.value}>{reportItem.HistoryofHypertension ? "Yes" : "No"}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Medications Taken:</Text>
              <Text style={styles.value}>{reportItem.Meditationtaken ? "Yes" : "No"}</Text>
            </View>
          </View>

          {/* Blood Tests Section */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Blood Tests</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Hemoglobin Level:</Text>
              <Text style={styles.value}>{reportItem.Hemoglobin}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Platelets:</Text>
              <Text style={styles.value}>{reportItem.Platelets}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>SGOT:</Text>
              <Text style={styles.value}>{reportItem.SGOT}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>SGPT:</Text>
              <Text style={styles.value}>{reportItem.SGPT}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Albumin:</Text>
              <Text style={styles.value}>{reportItem.Albumin}</Text>
            </View>
          </View>

          {/* Additional Tests Section */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Additional Tests</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Total Protein:</Text>
              <Text style={styles.value}>{reportItem.Totalprotein}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Direct Bilirubin:</Text>
              <Text style={styles.value}>{reportItem.DirectBilirubin}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Total Bilirubin:</Text>
              <Text style={styles.value}>{reportItem.TotalBilirubin}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>UREA:</Text>
              <Text style={styles.value}>{reportItem.UREA}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Urine Albumin:</Text>
              <Text style={styles.value}>{reportItem.UrineAlbumin}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Urine Ketone:</Text>
              <Text style={styles.value}>{reportItem.Urineketone}</Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Urine Sugar:</Text>
              <Text style={styles.value}>{reportItem.UrineSugar}</Text>
            </View>
          </View>

          {/* Other Reports */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Other Reports</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Additional Notes:</Text>
              <Text style={styles.value}>{reportItem.Otherreports}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HypertensionReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  reportContainer: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});
