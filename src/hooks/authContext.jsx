import React, { useContext, createContext } from 'react';
import useAuthActions from './useAuthActions';

const authContext = createContext();
// Provider hook that creates auth object and handles state
// useAuthActions

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function AuthProvider({ children }) {
  return (
    <authContext.Provider value={useAuthActions()}>
      {children}
    </authContext.Provider>
  );
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuthContext = () => {
  return useContext(authContext);
};
