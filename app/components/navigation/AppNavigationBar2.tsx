import { View, Text, StyleSheet } from 'react-native';
import NavigationIcon from '../../../assets/menu-icon.svg';
import QrCodeScanner from '../../../assets/qr-scan-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OpenedNavigation from './OpenedNavigation';
import { useState } from 'react';
import ArrowRight from '../../../assets/arrow-right.svg';
import { useNavigation } from 'expo-router';
import { GlobalStyles } from '../../styles/GlobalStyles';
import ShareIcon from '../../../assets/share-icon.svg';
import FavoriteBtn from '../FavoriteBtn';
import { useAppContainer } from '../container/Context';
import { useRoute } from '@react-navigation/native';
import AppNavigationIconsComponent from './AppNavigationIconsComponent';

type AppNavigationProps = {
  navOrBack: 'navbar' | 'back';
  screenTitle: string;
  scanIconShow?: boolean;
  titleShow?: boolean;
  screenScrollY?: number;
};

const AppNavigationBar2 = ({
  navOrBack,
  screenTitle,
  scanIconShow,
  titleShow,
  screenScrollY,
}: AppNavigationProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const navigation = useNavigation<any>();
  const openScanner = () => {
    setIsScannerOpen(true);
    navigation.navigate('QrScanner');
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
        {titleShow !== false && (
          <Text style={GlobalStyles.SmallTextBlueRegular}>{screenTitle}</Text>
        )}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
            transform: [{translateX: 51}]
          }}
        >
          <ShareIcon width={33} />
          {route.params !== undefined && (
            <FavoriteBtn
              Poi={poiData.find(Poi => Poi.id === route.params?.PoiId)}
              width={33}
              height={30}
              position='relative'
            />
          )}
          {scanIconShow !== false && (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={openScanner}
              style={{
                backgroundColor: '#FFF',
                paddingLeft: 10,
                paddingVertical: 8,
                paddingRight: 51,
                borderRadius: 10,
                elevation: 20,
              }}
            >
              <QrCodeScanner width={33} height={30} />
            </TouchableOpacity>
          )}
        </View> */}

        <AppNavigationIconsComponent
          scanIconShow={scanIconShow}
          openScanner={openScanner}
        />
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
