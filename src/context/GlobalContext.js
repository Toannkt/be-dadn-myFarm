import { useState, createContext } from 'react';

import * as controller from '../controller';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const user = controller.getLoggedInUser();
    const [currentUser, setCurrentUser] = useState(user);

    return <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;
