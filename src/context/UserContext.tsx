'use client'

import { createContext, useState } from 'react';

type userContextType = {
    name: string,
    type: 'ADMINISTRATOR' | 'USER'
}

type StateContextType = {
    user: userContextType;
    setUser: (user: userContextType) => void;
};

const defaultValue: userContextType = {
    name: '',
    type: 'USER'
}

const UserContext = createContext<StateContextType>({ user: defaultValue, setUser: () => { } } as StateContextType);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userContextType>(defaultValue)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }

