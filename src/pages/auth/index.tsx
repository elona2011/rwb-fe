import React, { createContext, useContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const authContext = createContext(false);

const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState(true)
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

interface Props {
    children: React.ReactNode;
    path: string;
    elementType?: keyof JSX.IntrinsicElements;
}

function PrivateRoute({ children, ...rest }: Props) {
    let auth = useContext(authContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export { ProvideAuth, PrivateRoute } 