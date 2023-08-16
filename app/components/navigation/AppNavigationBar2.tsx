import { View, Text, StyleSheet, Image } from 'react-native';
import NavigationIcon from '../../../assets/menu-icon.svg';
import QrCodeScanner from '../../../assets/qr-scan-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OpenedNavigation from './OpenedNavigation';
import { useState } from 'react';
import QrCodeScannerComponent from '../QrCodeScannerComponent';
import ArrowRight from '../../../assets/arrow-right.svg';
import { useNavigation } from 'expo-router';

type AppNavigationProps = {
  userProfileShow: boolean;
  navOrBack: 'navbar' | 'back';
  screenTitle: string;
};

const AppNavigationBar2 = ({
  userProfileShow,
  navOrBack,
  screenTitle,
}: AppNavigationProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const navigation = useNavigation();
  const openScanner = () => {
    setIsScannerOpen(true);
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
        <Text
          // style={[
          //   styles.navigationScreenName,
          //   { transform: [{ translateX: 5 }] },
          // ]}
          style={styles.navigationScreenName}
        >
          {screenTitle}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
            // position: 'absolute',
            // right: 21,
          }}
        >
          <TouchableOpacity activeOpacity={0.3} onPress={openScanner}>
            <QrCodeScanner width={33} height={30} />
          </TouchableOpacity>
          {userProfileShow && (
            <TouchableOpacity activeOpacity={0.3}>
              <Image
                source={require('../../../assets/images/user-profile-pic.jpeg')}
                width={41}
                height={41}
                style={styles.userPhoto}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isScannerOpen && <QrCodeScannerComponent onClose={closeScanner} />}
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
    width: '50%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  userPhoto: {
    width: 41,
    height: 41,
    borderRadius: 100,
  },
});
