import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';

export function useAuthentication() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
      FIREBASE_AUTH,
      user => {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
