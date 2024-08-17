import React, { createContext, useContext, useState } from "react";

interface ServerStateContextProps {
    serverDown: boolean;
    setServerDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServerStateContext = createContext<ServerStateContextProps | undefined>(undefined);

export const ServerStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [serverDown, setServerDown] = useState<boolean>(false);

    return (
        <ServerStateContext.Provider value={{ serverDown, setServerDown }}>
            {children}
        </ServerStateContext.Provider>
    );
};

export const useServerState = () => {
    const context = useContext(ServerStateContext);
    if (context === undefined) {
        throw new Error('useServerState must be used withint a ServerStateProvider');
    }
    return context;
};