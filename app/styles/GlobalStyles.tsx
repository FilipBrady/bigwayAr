import { StyleSheet } from 'react-native';
import { COLORS } from './Colors';

export const GlobalStyles = StyleSheet.create({
  HeadlineBlueBold: {
    //POI about page headline
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'ExtraBold',
    color: COLORS.primary,
  },
  SmallTextBlueRegular: {
    //navigation, user profile...
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Regular',
    color: COLORS.primary,
  },
  BigTextBlueBold: {
    //navigation on about POI page...
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ExtraBold',
    color: COLORS.primary,
  },
  BigTextBlueRegular: {
    //navigation on about POI page...
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Regular',
    color: COLORS.primary,
  },
  SmallTextBlueBold: {
    //navigation on about POI page...
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ExtraBold',
    color: COLORS.primary,
  },
  BigTextBlackRegulat: {
    //points, numbers
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Regular',
    color: COLORS.black,
  },
  ExtraSmallTextBlackRegulat: {
    //POI about page text
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Regular',
    color: COLORS.black,
  },
  SmallTextGrayRegulat: {
    //distance, navigation, secondary text
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Regular',
    color: COLORS.gray,
  },
  ExtraSmallTextGrayRegulat: {
    //distance, navigation, secondary text
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Regular',
    color: COLORS.gray,
  },
});
