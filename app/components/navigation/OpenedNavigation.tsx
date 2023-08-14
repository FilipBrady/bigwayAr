import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import CancelIcon from '../../../assets/cancle-icon.svg';
import PoiStar from '../../../assets/poi-star.svg';
import RankIcon from '../../../assets/rank-icon.svg';
import ScanIconGreen from '../../../assets/scan-icon-green-bg.svg';
import HeartIcon from '../../../assets/heart-icon.svg';
import OpenedNavigationComponent from './OpenedNavigationComponent';

const OpenedNavigation = () => {
  const [navigationItemList, setnavigationItemList] = useState([
    {
      navigationItenId: 1,
      navigationItemIcon: <PoiStar width={30} height={30} />,
      navigationItemText: 'Všetky lokality QR kódy',
    },
    {
      navigationItenId: 2,
      navigationItemIcon: <RankIcon width={30} height={30} />,
      navigationItemText: 'Aktuálny rebríček',
    },
    {
      navigationItenId: 3,
      navigationItemIcon: <ScanIconGreen width={30} height={30} />,
      navigationItemText: 'Zoznam získaných POI/QR',
    },
    {
      navigationItenId: 4,
      navigationItemIcon: <HeartIcon width={30} height={30} />,
      navigationItemText: 'Obľúbené POI/QR',
    },
  ]);
  return (
    <View style={styles.openedNavigationContainer}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 24,
          marginTop: 47,
          gap: 45,
          marginBottom: 70,
        }}
      >
        <TouchableOpacity activeOpacity={0.3}>
          <CancelIcon width={26} height={25} />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/Logo-appky.png')}
          width={149}
          height={37}
        />
      </View>
      {navigationItemList.map(navigationItem => (
        <OpenedNavigationComponent
          key={navigationItem.navigationItenId}
          navigationItem={navigationItem}
        />
      ))}
      {/* <TouchableOpacity activeOpacity={0.3} style={styles.navigationItem}>
        <View style={styles.navigationItemImageBox}>
          <PoiStar width={30} height={30} />
        </View>
        <Text>Všetky lokality QR kódy</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default OpenedNavigation;

const styles = StyleSheet.create({
  openedNavigationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '85%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    elevation: 40,
    shadowOffset: { width: 20, height: 40 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginLeft: 21,
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
