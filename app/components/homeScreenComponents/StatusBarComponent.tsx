import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const StatusBarComponent = () => {
  return (
    <View style={styles.statusBarContainer}>
      <View>
        <Text style={styles.statusBarText}>Aktúalny počet bodov</Text>
        <Text style={styles.statusBarNumber}>1580</Text>
      </View>
      <View>
        <Text style={styles.statusBarText}>Aktuálne miesto</Text>
        <Text style={[styles.statusBarNumber, { alignSelf: 'flex-end' }]}>
          150
        </Text>
      </View>
    </View>
  );
};

export default StatusBarComponent;
const styles = StyleSheet.create({
  statusBarContainer: { flexDirection: 'row', justifyContent: 'space-between', height: 50},
  statusBarText: { fontSize: 12, color: '#797979', fontWeight: '400' },
  statusBarNumber: { fontSize: 16, color: '#000000', fontWeight: '400' },
});
