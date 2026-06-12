import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from '../firebase';

const AuthContext = createContext(null);

const missingConfigMessage = 'Firebase is not configured. Add VITE_FIREBASE_* values to your .env file.';

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const login = (email, password) => {
    if (!auth) return Promise.reject(new Error(missingConfigMessage));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    if (!auth) return Promise.reject(new Error(missingConfigMessage));

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(auth, provider);
  };

  const signup = async ({ email, password, username, firstName }) => {
    if (!auth) throw new Error(missingConfigMessage);

    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = username || firstName;

    if (displayName) {
      await updateProfile(credentials.user, { displayName });
    }

    return credentials;
  };

  const logout = () => {
    if (!auth) return Promise.reject(new Error(missingConfigMessage));
    return signOut(auth);
  };

  const value = useMemo(
    () => ({
      currentUser,
      hasFirebaseConfig,
      loading,
      login,
      loginWithGoogle,
      logout,
      signup,
    }),
    [currentUser, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
