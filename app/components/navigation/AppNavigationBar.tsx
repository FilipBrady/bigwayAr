import { View, Text, StyleSheet, Image } from 'react-native';
import NavigationIcon from '../../../assets/menu-icon.svg';
import QrCodeScanner from '../../../assets/qr-scan-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OpenedNavigation from './OpenedNavigation';

const AppNavigationBar = () => {
  return (
    <View style={{ height: '100%' }}>
      <OpenedNavigation />
      <View style={styles.navigationContainer}>
        <TouchableOpacity activeOpacity={0.3}>
          <NavigationIcon width={30} height={21} />
        </TouchableOpacity>
        <Text
          style={[
            styles.navigationScreenName,
            { transform: [{ translateX: 5 }] },
          ]}
        >
          Domov
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
            position: 'absolute',
            right: 21,
          }}
        >
          <TouchableOpacity activeOpacity={0.3}>
            <QrCodeScanner width={33} height={30} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3}>
            <Image
              source={require('../../../assets/images/user-profile-pic.jpeg')}
              width={41}
              height={41}
              style={styles.userPhoto}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppNavigationBar;

const styles = StyleSheet.create({
  navigationContainer: {
    height: 85,
    flexDirection: 'row',
    paddingHorizontal: 21,
    alignItems: 'center',
    position: 'relative',
  },
  navigationScreenName: {
    color: '#124B92',
    fontSize: 16,
    fontWeight: '400',
    position: 'absolute',
    right: '50%',
  },
  userPhoto: {
    width: 41,
    height: 41,
    borderRadius: 100,
  },
});
