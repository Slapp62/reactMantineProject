// src/context/AuthContextCore.tsx
import React, { createContext, useState} from 'react';
import { JwtPayload } from 'jwt-decode'; // To type the decoded token

interface AuthContextCoreType {
  user: JwtPayload | null;
  login: (decodedUser: JwtPayload) => void;
}

const AuthContextCore = createContext<AuthContextCoreType>({
  user: null,
  login: () => {
  },
});


export const AuthCoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
  const [user, setUser] = useState<JwtPayload | null>(null);

  
  const login = (decodedUser: JwtPayload) => {
    setUser(decodedUser); 
  };

 
  const contextValue: AuthContextCoreType = {
    user,   
    login,   
  };

  return (
    <AuthContextCore.Provider value={contextValue}>
      {children}
    </AuthContextCore.Provider>
  );
};

// 4. Export the context itself so components can use useContext(AuthContextCore)
export default AuthContextCore;