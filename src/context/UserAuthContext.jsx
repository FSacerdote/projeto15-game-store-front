import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("game-store")) || { userInfo: {}, token: "" });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserAuthProvider;