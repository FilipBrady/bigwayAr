import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import FilterIcon from '../../../assets/filter-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppContainer } from '../../components/container/Context';
import RecommendedPoiComponent from '../../components/homeScreenComponents/RecommendedPoiComponent';
import PoiThumbnailContainer from '../../components/PoiThumbnailContainer';
import PoiFilterComponent from '../../components/PoiFilterComponent';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { COLORS } from '../../styles/Colors';

const AllPoiLocationsScreen = () => {
  const { poiData } = useAppContainer();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterByPoints, setFilterByPoints] = useState({ from: 0, to: 100000 });
  const PoiByPoints = poiData.filter(
    poiData =>
      poiData.poiPoints < filterByPoints.to &&
      poiData.poiPoints > filterByPoints.from
  );

  return (
    <View style={{ paddingHorizontal: 21, backgroundColor: COLORS.white }}>
      <View style={{ height: '20%' }}>
        <AppNavigationBar2 navOrBack={'back'} screenTitle={'Všetky lokality'} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 39,
          }}
        >
          <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
            Zoradiť podľa
          </Text>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <FilterIcon width={25} />
          </TouchableOpacity>
        </View>
        {isFilterVisible && (
          <PoiFilterComponent setFilterByPoints={setFilterByPoints} />
        )}
      </View>
      <View style={{ maxHeight: '80%' }}>
        <PoiThumbnailContainer PoiByPoints={PoiByPoints} />
      </View>
    </View>
  );
};

export default AllPoiLocationsScreen;
