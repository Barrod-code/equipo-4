import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../components/FirebaseConfig';

export default function useAuthActions() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const signIn = (email, password) => {
    return authService
      .signInWithEmailAndPassword(email, password)
      .then((response) => response.user)
      .catch((e) => {
        setError(e);
        throw Error(e);
      });
  };
  const signUp = (userData) => {
    return authService
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        authService.currentUser.updateProfile({
          displayName: `${userData.name} ${userData.surname}`,
          photoURL: 'https://picsum.photos/200',
        });
      })
      .catch((e) => {
        setError(e);
        throw Error(e);
      });
  };
  const signOut = () => {
    return authService
      .signOut()
      .then(() => {
        setUser(false);
      })
      .catch((e) => {
        setError(e);
        throw Error(e);
      });
  };
  const sendPasswordResetEmail = (email) => {
    return authService
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch((e) => {
        setError(e);
        throw Error(e);
      });
  };
  const confirmPasswordReset = (code, password) => {
    return authService
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      })
      .catch((e) => {
        setError(e);
        throw Error(e);
      });
  };
  // clean errors after changing location
  useEffect(() => {
    // Listen for changes to the current location.
    const unlisten = history.listen(() => setError(null));
    // cleanup the listener on unmount
    return unlisten;
  }, [history]);
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);
  // Return the user object and auth methods
  return {
    user,
    error,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
