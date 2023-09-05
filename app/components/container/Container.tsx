import { useEffect, useState } from 'react';
import { Provider } from './Context';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
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

    fetchPoiData();
  }, []);

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(
      FIREBASE_AUTH,
      async user => {
        if (user) {
          const userDocRef = doc(FIREBASE_DB, 'users', user.uid);

          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setCurrentUserData(docSnap.data() as UserData);
          }

          const unsubscribeUserData = onSnapshot(userDocRef, doc => {
            if (doc.exists()) {
              setCurrentUserData(doc.data() as UserData);
            }
          });

          return () => {
            unsubscribeUserData();
          };
        } else {
          setCurrentUserData(undefined);
        }
      }
    );

    return () => {
      unsubscribeAuthState();
    };
  }, []);

  const appState: AppState = {
    poiData: poiData,
    usersData: usersData,
    currentUserData: currentUserData,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
