import { createContext, useState } from 'react';

const UserContext = createContext(undefined);

const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        userInfo: {

        },
        token: "",
    });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserAuthProvider;