import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { doc, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase';
import { useAppContainer } from './container/Context';
import { PointOfInterest } from '../data/poiData';
import HeartIconFull from '../../assets/heart-icon.svg';
import HeartIconEmpty from '../../assets/heart-icon-empty.svg';
import HeartIconEmptyBlack from '../../assets/heart-icon-empty-black.svg';

type favoriteBtnProps = {
  Poi: PointOfInterest;
  width: number;
  height: number;
  color: 'white' | 'black';
};

const FavoriteBtn = ({ Poi, width, height, color }: favoriteBtnProps) => {
  const { currentUserData } = useAppContainer();
  const userDataToUpdateRef = doc(
    FIREBASE_DB,
    'users',
    String(currentUserData?.id)
  );

  const handleAddToFavorite = async (poiId: string) => {
    const newFavoriteRef = doc(collection(FIREBASE_DB, 'POI'));

    if (currentUserData && currentUserData.favorite) {
      await updateDoc(userDataToUpdateRef, {
        favorite: arrayUnion({
          favotireId: newFavoriteRef.id,
          poiId: poiId,
        }),
      });
    }
  };
  const handleRemoveFromFavorite = async (poiId: string) => {
    if (currentUserData && currentUserData.favorite) {
      const updatedFavorites = currentUserData.favorite.filter(
        favoriteItem => favoriteItem.poiId !== poiId
      );
      try {
        await updateDoc(userDataToUpdateRef, {
          favorite: updatedFavorites,
        });
      } catch (error) {
        console.error('Error removing item from favorite:', error);
      }
    }
  };

  return (
    <View>
      {currentUserData?.favorite && currentUserData.favorite.length > 0 ? (
        currentUserData.favorite.map(favoritePlace => (
          <View key={favoritePlace.poiId} style={{ position: 'relative' }}>
            {favoritePlace.poiId === Poi.id ? (
              <Pressable
                style={styles.fullHeart}
                onPress={() => {
                  handleRemoveFromFavorite(Poi.id);
                }}
              >
                <HeartIconFull width={width} height={height} />
              </Pressable>
            ) : (
              <Pressable
                style={styles.emptyHeart}
                onPress={() => {
                  handleAddToFavorite(Poi.id);
                }}
              >
                {color === 'white' ? (
                  <HeartIconEmpty width={width} height={height} />
                ) : (
                  <HeartIconEmptyBlack width={width} height={height} />
                )}
              </Pressable>
            )}
          </View>
        ))
      ) : (
        <Pressable
          style={styles.emptyHeart}
          onPress={() => {
            handleAddToFavorite(Poi.id);
          }}
        >
          {color === 'white' ? (
            <HeartIconEmpty width={width} height={height} />
          ) : (
            <HeartIconEmptyBlack width={width} height={height} />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default FavoriteBtn;

const styles = StyleSheet.create({
  emptyHeart: {
    position: 'absolute',
    top: 7,
    left: 5,
    zIndex: 99,
  },
  fullHeart: {
    position: 'absolute',
    top: 7,
    left: 5,
    zIndex: 100,
  },
});
