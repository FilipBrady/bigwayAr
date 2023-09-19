import React, {  } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';

type ImageOverlayProps = {
  imagePosition: { x: number; y: number };
  imageSize: { width: number; height: number };
  scannedPoiId: string;
  handleNavigateToPoi: () => void;
  imageUrl: string;
};

const ImageOverlay = ({
  imagePosition,
  imageSize,
  scannedPoiId,
  imageUrl,
  handleNavigateToPoi,
}: ImageOverlayProps) => {
  return (
    <View
      style={
        scannedPoiId === ''
          ? { opacity: 0 }
          : {
              opacity: 1,
              position: 'absolute',
              top: imagePosition.x - 15,
              left: imagePosition.y - 15,
              width: imageSize.height + 30,
              height: imageSize.width + 60,
              flexDirection: 'column',
            }
      }
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: imageSize.height + 30,
          height: imageSize.width + 30,
          backgroundColor: '#000',
        }}
      />
      <Pressable
        onPress={handleNavigateToPoi}
        style={scannedPoiId === '' ? { opacity: 0 } : { opacity: 1 }}
      >
        <Text style={[GlobalStyles.SmallTextBlueBold, { textAlign: 'center' }]}>
          Open POI
        </Text>
      </Pressable>
    </View>
  );
};

export default ImageOverlay;
