import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  return (

    <AuthContext.Provider

      value={{

        isLoggedIn,

        setIsLoggedIn,

        showLogin,

        setShowLogin,

        showSignup,

        setShowSignup,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);