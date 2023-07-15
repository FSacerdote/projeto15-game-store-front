import { createContext, useState } from "react";

const UserContext = createContext()

function UserContextProvider({children}){

    const lsToken = localStorage.getItem("token")
    const [token, setToken] = useState(lsToken)

    return(
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}