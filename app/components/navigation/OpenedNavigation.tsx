import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
  Button,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '../../../assets/cancle-icon.svg';
import PoiStar from '../../../assets/poi-star.svg';
import RankIcon from '../../../assets/rank-icon.svg';
import ScanIconGreen from '../../../assets/scan-icon-green-bg.svg';
import HeartIcon from '../../../assets/heart-icon.svg';
import LogOutIcon from '../../../assets/logout.svg';
import OpenedNavigationComponent from './OpenedNavigationComponent';
import { signOut } from 'firebase/auth';
import { GlobalStyles } from '../../styles/GlobalStyles';

type OpenNavigationProps = {
  isNavigationOpen: boolean;
  setIsNavigationOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const OpenedNavigation = ({
  isNavigationOpen,
  setIsNavigationOpen,
}: OpenNavigationProps) => {
  const [navigationItemList, setnavigationItemList] = useState([
    {
      navigationItenId: 1,
      navigationItemIcon: <PoiStar width={30} height={30} />,
      navigationItemText: 'Všetky lokality QR kódy',
      navigationItemHref: 'AllPoiLocations',
    },
    {
      navigationItenId: 2,
      navigationItemIcon: <RankIcon width={30} height={30} />,
      navigationItemText: 'Aktuálny rebríček',
      navigationItemHref: 'Home',
    },
    {
      navigationItenId: 3,
      navigationItemIcon: <ScanIconGreen width={30} height={30} />,
      navigationItemText: 'Zoznam získaných POI/QR',
      navigationItemHref: 'Home',
    },
    {
      navigationItenId: 4,
      navigationItemIcon: <HeartIcon width={30} height={30} />,
      navigationItemText: 'Obľúbené POI/QR',
      navigationItemHref: 'FavoritePoiLocations',
    },
    {
      navigationItenId: 5,
      navigationItemIcon: (
        <Image
          source={require('../../../assets/images/user-profile-pic.jpeg')}
          width={41}
          height={41}
          style={{ width: 41, height: 41, borderRadius: 5 }}
        />
      ),
      navigationItemText: 'Nastavenia účtu',
      navigationItemHref: 'UserProfile',
    },
    {
      navigationItenId: 6,
      navigationItemIcon: <LogOutIcon width={30} height={30} />,
      navigationItemText: 'Odhlásiť',
      navigationItemHref: 'LogOut',
    },
  ]);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isNavigationOpen ? 1 : 0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isNavigationOpen]);
  return (
    <Animated.View
      style={[
        styles.openedNavigationContainer,
        {
          transform: [
            {
              translateX: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-700, 0],
              }),
            },
          ],
          opacity: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 24,
          marginTop: 47,
          gap: 45,
          marginBottom: 70,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setIsNavigationOpen(false)}
        >
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
          setIsNavigationOpen={setIsNavigationOpen}
        />
      ))}
    </Animated.View>
  );
};

export default OpenedNavigation;

const styles = StyleSheet.create({
  openedNavigationContainer: {
    position: 'absolute',
    top: 0,
    left: -21,
    width: '95%',
    height: Dimensions.get('screen').height,
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
