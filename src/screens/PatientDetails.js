import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { MaterialIcons } from '@expo/vector-icons';
import { API_SERVER_URL } from './config';
import { API_SERVER_SOCKET } from './config';

const Stack = createStackNavigator();
const socket = socketIOClient(`${API_SERVER_SOCKET}`);

const PatientDetails = ({ route }) => {
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add state for refreshing

  const navigation = useNavigation();

  const fetchReports = async () => {
    setRefreshing(true);
    try {
      const anemiaResponse = await axios.get(`${API_SERVER_URL}/fetch-anemia-data/${route.params.patient.patientid}`);
      const hyperResponse = await axios.get(`${API_SERVER_URL}/fetch-hyper-data/${route.params.patient.patientid}`);
      const generalResponse = await axios.get(`${API_SERVER_URL}/fetch-General-data/${route.params.patient.patientid}`);
  
      // Add report type to each report
      const anemiaReports = anemiaResponse.data.map(report => ({ ...report, type: 'anemia' }));
      const hyperReports = hyperResponse.data.map(report => ({ ...report, type: 'hypertension' }));
      const generalReports = generalResponse.data.map(report => ({ ...report, type: 'general' }));
  
      const combinedReports = [...anemiaReports, ...hyperReports, ...generalReports];
      setReports(combinedReports);
    } catch (error) {
      console.log('Error fetching reports:', error);
    } finally {
      setRefreshing(false);
    }
  };
  

  useEffect(() => {
    fetchReports(); // Fetch reports when component mounts
  }, [route.params.patient.patientid]);

 // Function to handle pressing a report item and navigate to the correct report page
const handleReportPress = (item) => {
  if (item.type === 'anemia') {
    navigation.navigate('AnemiaReport', { reportItem: item });
  } else if (item.type === 'hypertension') {
    navigation.navigate('HypertensionReport', { reportItem: item });
  } else if (item.type === 'general') {
    navigation.navigate('GeneralReport', { reportItem: item });
  }
};

// Separate the reports into types and maintain numbering
const renderReportItem = ({ item }) => {
  const anemiaReportsCount = reports.filter(report => report.type === 'anemia').indexOf(item) + 1;
  const hyperReportsCount = reports.filter(report => report.type === 'hypertension').indexOf(item) + 1;
  const generalReportsCount = reports.filter(report => report.type === 'general').indexOf(item) + 1;

  // Determine the correct title and index for each report type
  let reportTitle;
  if (item.type === 'anemia') {
    reportTitle = `Anemia Report - ${anemiaReportsCount}`;
  } else if (item.type === 'hypertension') {
    reportTitle = `Hyper Report - ${hyperReportsCount}`;
  } else {
    reportTitle = `General Report - ${generalReportsCount}`;
  }

  return (
    <TouchableOpacity onPress={() => handleReportPress(item)}>
      <View style={styles.reportItem}>
        <Text style={styles.reportTitle}>{reportTitle}</Text>
        <Text style={styles.info}>Dated on: {new Date(item.date).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
};



  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
    return () => {
      // Reset the tabBarVisible when the component is unmounted
      navigation.setOptions({
        tabBarVisible: true,
      });
    };
  }, [navigation]);

  // useEffect to update recently viewed patients list in AsyncStorage
  useEffect(() => {
    const updateRecentlyViewed = async () => {
      try {
        const recentlyViewedData = await AsyncStorage.getItem('recentlyViewed');
        let recentlyViewedPatients = recentlyViewedData ? JSON.parse(recentlyViewedData) : [];

        const existingPatientIndex = recentlyViewedPatients.findIndex(
          p => p._id === route.params.patient._id,
        );

        if (existingPatientIndex !== -1) {
          recentlyViewedPatients[existingPatientIndex].timestamp = new Date().toISOString();
        } else {
          recentlyViewedPatients = [
            { ...route.params.patient, timestamp: new Date().toISOString() },
            ...recentlyViewedPatients.slice(0, 4),
          ];
        }

        await AsyncStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedPatients));
      } catch (error) {
        console.error('Error updating recently viewed patients:', error);
      }
    };

    updateRecentlyViewed();
  }, [route.params.patient]);

  // Calculate BMI
  const bmiheight = route.params.patient.Height;
  const bmiweight = route.params.patient.Weight;
  const convertheight = bmiheight / 100;
  const BMI = bmiweight / (convertheight * convertheight);
  const fixedbmi = BMI.toPrecision(3);

  // Get BMI details
  const getBMIDetails = bmi => {
    if (bmi < 18.5) {
      return { color: 'red', category: 'Underweight' };
    } else if (bmi >= 18.5 && bmi < 25) {
      return { color: 'green', category: 'Normal weight' };
    } else if (bmi >= 25 && bmi < 30) {
      return { color: '#3f0e0e', category: 'Overweight' };
    } else {
      return { color: 'blue', category: 'Obesity' };
    }
  };

  const bmiDetails = getBMIDetails(parseFloat(fixedbmi));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.outerbox}>
        <View style={styles.bodybox}>
          <View style={styles.headercontent}>
            <Text style={styles.headname}>Patient Details</Text>
            <View style={styles.whitebox}>
              <View style={styles.listbox}>
                <View style={styles.listitem}>
                  <View style={styles.cir}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                      {route.params.patient.name[0].toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.patientcontent}>
                  <Text style={styles.tcontent}>{route.params.patient.name.toUpperCase()}</Text>
                  <Text style={styles.tcontent}>{route.params.patient.patientid}</Text>
                  <Text style={{ color: '#f44336' }}></Text>
                </View>
                <View style={{ flexDirection: 'row', left: 200, position: 'absolute' }}>
                  <Text style={{ fontWeight: 'bold', lineHeight: 22, fontSize: 18 }}>BMI: </Text>
                  <Text style={{ color: bmiDetails.color, fontSize: 18 }}>{fixedbmi}</Text>
                  <Text style={{ fontSize: 16, lineHeight: 22 }}> kg/m</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', lineHeight: 14 }}>2</Text>
                </View>
                <Text style={{ color: bmiDetails.color, marginTop: 20, left: 200, position: 'absolute' }}>({bmiDetails.category})</Text>
              </View>
              <View style={styles.bodycontent}>
                <Text>Age: {route.params.patient.Age}</Text>
                <View style={styles.lineStyle} />
                <View>
                  <Text style={styles.last}>Height: {route.params.patient.Height} cm</Text>
                  <Text>Weight: {route.params.patient.Weight} kg</Text>
                </View>
              </View>
            </View>
            <View style={styles.lineSt} />
            <View style={styles.properalign}>
            </View>
            <View style={styles.bodyhead}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Reports</Text>
              <View style={{alignItems:"center"}}>
              <MaterialIcons onPress={() => navigation.push("Addreports", { patient: route.params.patient })} name="note-add" size={40} color="#119988" />
                <Text style={{ fontSize: 16,color:"#800000" }}>Add Report</Text>
              </View>
            </View>
            <View style={styles.container0}>
              <FlatList
                data={reports}
                renderItem={renderReportItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text>No reports available</Text>}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchReports} // Refresh the reports when pull-to-refresh is triggered
                    colors={['#119988']}
                  />
                }
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  info: {
    color: "#fff"
  },
  reportTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff"
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignItems: 'center'
  },
  container0: {
    flex: 0,
    paddingTop: 20,
    maxHeight: "65%"
  },
  reportItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#199999",
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  listitems: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listitem: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    color: '#fff',
  },
  head: {
    paddingLeft: 10,
    paddingRight: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignItems: 'center'
  },
  input: {
    opacity: 0.5,
  },
  seicon: {
    paddingTop: 10,
    paddingRight: 10,
  },
  searchstyle: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#f0f0f0',
    width: '100%',
    paddingLeft: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  btnstyle: {
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: '#ff7373',
  },
  search: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineSt: {
    borderWidth: 0.6,
    borderColor: 'black',
    width: '100%',
    top: 10,
  },
  last: {
    paddingBottom: 10,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    height: 40,
  },
  bodycontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  patientcontent: {
    // rowGap:5,
    paddingLeft: 20,
  },
  tcontent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  tcontents: {
    fontSize: 15,
    fontWeight: 'bold',
    left: 15,
    width: 150,
  },
  outerbox: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  bodybox: {
    width: '100%',
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    top: 10,
    height: '100%',
  },
  headname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f2f2f',
  },
  cir: {
    height: 40,
    width: 40,
    backgroundColor: '#199999',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listbox: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  listboxs: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  dosagestyle: {
    top: 10,
  },
  whitebox: {
  },
});
