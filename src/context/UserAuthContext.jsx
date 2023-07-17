import { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        userInfo: {

        },
        token: "",
    });
    console.log(userData);
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserAuthProvider;