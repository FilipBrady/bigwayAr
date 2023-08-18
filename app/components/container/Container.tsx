import { useEffect, useState } from 'react';
import { Provider } from './Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { PointOfInterest, PointsOfInterest } from '../../data/poiData';

export type AppState = {
  test: string;
  poiData: PointsOfInterest;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const [test, setTest] = useState('Hiiii');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [poiData, setPoiData] = useState<PointsOfInterest>([]);

  useEffect(() => {
    const fetchPoiData = async () => {
      if (!hasLoaded) {
        setHasLoaded(true);
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'POI'));

        const newData: any = [];
        querySnapshot.forEach(doc => {
          newData.push(doc.data());
        });

        setPoiData(newData);
      }
    };

    fetchPoiData();
  }, []);

  const appState: AppState = {
    test: test,
    poiData: poiData,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
