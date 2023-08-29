import { useEffect, useState } from 'react';
import { Provider } from './Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import {
  PointOfInterest,
  PointsOfInterest,
  UserData,
  UsersData,
} from '../../data/poiData';

export type AppState = {
  poiData: PointsOfInterest;
  usersData: UsersData;
  currentUserData: UserData | undefined;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [poiData, setPoiData] = useState<PointsOfInterest>([]);
  const [usersData, setUsersData] = useState<UsersData>([]);
  const [currentUserData, setCurrentUserData] = useState<UserData>();
  useEffect(() => {
    const fetchPoiData = async () => {
      if (!hasLoaded) {
        setHasLoaded(true);
        const PoiQuerySnapshot = await getDocs(collection(FIREBASE_DB, 'POI'));

        const newPoiData: any = [];
        PoiQuerySnapshot.forEach(doc => {
          newPoiData.push(doc.data());
        });

        setPoiData(newPoiData);
      }
    };
    const fetchUsersData = async () => {
      const UserQuerySnapshot = await getDocs(collection(FIREBASE_DB, 'users'));

      const newUserData: any = [];

      UserQuerySnapshot.forEach(doc => {
        newUserData.push(doc.data());
        if (doc.data().id === FIREBASE_AUTH.currentUser?.uid) {
          setCurrentUserData(doc.data());
        }
      });

      setUsersData(newUserData);
    };

    fetchPoiData();
    fetchUsersData();
  }, []);

  const appState: AppState = {
    poiData: poiData,
    usersData: usersData,
    currentUserData: currentUserData,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
