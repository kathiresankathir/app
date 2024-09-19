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
import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { API_SERVER_URL } from './config';

const Viewreport = ({ route }) => {
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const patient = route.params.doctorID;
  const navigation = useNavigation();

  const fetchReports = async () => {
    setRefreshing(true);
    try {
      const anemiaResponse = await axios.get(`${API_SERVER_URL}/fetch-anemia-data/${patient}`);
      const hyperResponse = await axios.get(`${API_SERVER_URL}/fetch-hyper-data/${patient}`);
      const generalResponse = await axios.get(`${API_SERVER_URL}/fetch-General-data/${patient}`);
  
      const anemiaReports = anemiaResponse.data.map(report => ({ ...report, type: 'anemia' }));
      const hyperReports = hyperResponse.data.map(report => ({ ...report, type: 'hypertension' }));
      const generalReports = generalResponse.data.map(report => ({ ...report, type: 'general' }));
  
      setReports([...anemiaReports, ...hyperReports, ...generalReports]);
    } catch (error) {
      console.log('Error fetching reports:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [route.params.doctorID]);

  const handleReportPress = (item) => {
    const reportPages = {
      anemia: 'AnemiaReportscreen',
      hypertension: 'HypertensionReportscreen',
      general: 'GeneralReportscreen',
    };
    navigation.navigate(reportPages[item.type], { reportItem: item });
  };

  // Keep report numbering (Anemia Report - 1, Hyper Report - 1, etc.)
  const renderReportItem = ({ item }) => {
    const anemiaReportsCount = reports.filter(report => report.type === 'anemia').indexOf(item) + 1;
    const hyperReportsCount = reports.filter(report => report.type === 'hypertension').indexOf(item) + 1;
    const generalReportsCount = reports.filter(report => report.type === 'general').indexOf(item) + 1;

    let reportTitle;
    if (item.type === 'anemia') {
      reportTitle = `Anemia Report - ${anemiaReportsCount}`;
    } else if (item.type === 'hypertension') {
      reportTitle = `Hyper Report - ${hyperReportsCount}`;
    } else {
      reportTitle = `General Report - ${generalReportsCount}`;
    }

    return (
      <TouchableOpacity onPress={() => handleReportPress(item)} style={styles.reportItem}>
        <Text style={styles.reportTitle}>{reportTitle}</Text>
        <Text style={styles.info}>Dated on: {new Date(item.date).toLocaleDateString()}</Text>
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
    return () => navigation.setOptions({ tabBarVisible: true });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View Your Reports</Text>
      </View>
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No reports available</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchReports} colors={['#119988']} />
        }
      />
    </SafeAreaView>
  );
};

export default Viewreport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  reportItem: {
    backgroundColor: '#199999',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});
