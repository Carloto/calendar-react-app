import React, { useContext } from 'react';
import { IUser } from '../backend';

export interface IAuthContext {
  user: IUser;
  onLogout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  user: {
    name: '',
    email: '',
  },
  onLogout: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}
