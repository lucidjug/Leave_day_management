import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: "",
  name: "",
  email: "",
  role: "",
});

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  return (
    <AuthContext.Provider value={{
      user, setUser,
      isLoading, setIsLoading
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}
