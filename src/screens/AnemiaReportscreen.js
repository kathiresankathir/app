import React ,{useLayoutEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView , Image, TouchableOpacity,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const AnemiaReportscreen = ({ route ,navigation}) => {
  const { reportItem } = route.params; // Get the report details from the navigation params


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header1} >
        <Image source={require('../images/img2.png')}/>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Anemia Report</Text>
        </View>

        <View style={styles.reportContainer}>
          {/* Report Date */}
          <View style={styles.section}>
            <Text style={styles.label}>Report Date:</Text>
            <Text style={styles.value}>{new Date(reportItem.date).toLocaleDateString()}</Text>
          </View>

          {/* Hemoglobin and Transfusion */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Hemoglobin and Blood Data:</Text>
            <Text style={styles.label}>Hemoglobin Level:</Text>
            <Text style={styles.value}>{reportItem.HemoglobinLevel} g/dL</Text>

            <Text style={styles.label}>Blood Transfusion:</Text>
            <Text style={styles.value}>{reportItem.BloodTransfusion ? "Yes" : "No"}</Text>

            <Text style={styles.label}>Bleeding Disorder:</Text>
            <Text style={styles.value}>{reportItem.BleedingDisorder ? "Yes" : "No"}</Text>
          </View>

          {/* Additional RBC Indices */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Red Blood Cell Indices:</Text>
            <Text style={styles.label}>Mean corpuscular volume (MCV):</Text>
            <Text style={styles.value}>{reportItem.MCV} fL</Text>

            <Text style={styles.label}>Mean corpuscular hemoglobin (MCH):</Text>
            <Text style={styles.value}>{reportItem.MCH} pg/cell</Text>

            <Text style={styles.label}>Mean corpuscular hemoglobin concentration (MCHC):</Text>
            <Text style={styles.value}>{reportItem.MCHC} g/dL</Text>

            <Text style={styles.label}>Red Cell Distribution Width (RDW):</Text>
            <Text style={styles.value}>{reportItem.RDW} %</Text>

            <Text style={styles.label}>Mentzer Index:</Text>
            <Text style={styles.value}>{reportItem.MentzerIndex}</Text>
          </View>

          {/* Anemia Diagnosis */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Anemia Diagnosis:</Text>
            <Text style={styles.label}>Iron Deficiency Anemia:</Text>
            <Text style={styles.value}>{reportItem.IronDeficiencyAnemia ? "Yes" : "No"}</Text>

            <Text style={styles.label}>Target HB:</Text>
            <Text style={styles.value}>{reportItem.targetHB} g/dL</Text>

            <Text style={styles.label}>Actual HB:</Text>
            <Text style={styles.value}>{reportItem.actualHB} g/dL</Text>
            <Text style={styles.label}>Prepregnancy Weight:</Text>
            <Text style={styles.value}>{reportItem.prepregnancyWeight} kg</Text>
            <Text style={styles.label}>IronDeficiency Anemia Value :</Text>

            <Text style={styles.value}>{reportItem.IronDeficiencyAnemiaValue} </Text>

          </View>

          {/* Prepregnancy and Other Details */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Additional Details:</Text>
          

            <Text style={styles.label}>Other Reports:</Text>
            <Text style={styles.value}>{reportItem.otherReports}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnemiaReportscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header1: {
    alignItems: 'center',
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
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});