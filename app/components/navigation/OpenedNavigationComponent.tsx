import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

type NavigationItemProps = {
  navigationItem: {
    navigationItenId: number;
    navigationItemIcon: React.JSX.Element;
    navigationItemText: string;
  };
};

const OpenedNavigationComponent = ({ navigationItem }: NavigationItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.3} style={styles.navigationItem}>
      <View style={styles.navigationItemImageBox}>
        {navigationItem.navigationItemIcon}
      </View>
      <Text>{navigationItem.navigationItemText}</Text>
    </TouchableOpacity>
  );
};

export default OpenedNavigationComponent;

const styles = StyleSheet.create({
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginLeft: 21,
    marginBottom: 23,
  },
  navigationItemImageBox: {
    width: 47,
    height: 47,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: '#000',
    elevation: 20,
    shadowOffset: { width: 20, height: 40 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
