import { View, Text, StyleSheet } from 'react-native';
import NavigationIcon from '../../../assets/menu-icon.svg';
import QrCodeScanner from '../../../assets/qr-scan-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OpenedNavigation from './OpenedNavigation';
import { useState } from 'react';
import ArrowRight from '../../../assets/arrow-right.svg';
import { useNavigation } from 'expo-router';
import { GlobalStyles } from '../../styles/GlobalStyles';

type AppNavigationProps = {
  navOrBack: 'navbar' | 'back';
  screenTitle: string;
};

const AppNavigationBar2 = ({ navOrBack, screenTitle }: AppNavigationProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const navigation = useNavigation<any>();
  const openScanner = () => {
    setIsScannerOpen(true);
    navigation.navigate('QrScanner');
  };

  const closeScanner = () => {
    setIsScannerOpen(false);
  };

  return (
    <View>
      <OpenedNavigation
        isNavigationOpen={isNavigationOpen}
        setIsNavigationOpen={setIsNavigationOpen}
      />
      <View style={styles.navigationContainer}>
        {navOrBack === 'navbar' ? (
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => setIsNavigationOpen(true)}
          >
            <NavigationIcon width={30} height={21} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => navigation.goBack()}
          >
            <ArrowRight width={30} height={20} rotation={180} />
          </TouchableOpacity>
        )}
        <Text style={GlobalStyles.SmallTextBlueRegular}>{screenTitle}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
          }}
        >
          <TouchableOpacity activeOpacity={0.3} onPress={openScanner}>
            <QrCodeScanner width={33} height={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppNavigationBar2;

const styles = StyleSheet.create({
  navigationContainer: {
    minHeight: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigationScreenName: {
    color: '#124B92',
    fontSize: 16,
    fontWeight: '400',
  },
  userPhoto: {
    width: 41,
    height: 41,
    borderRadius: 100,
  },
});
