import React, { createContext, useContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";
import axios from 'axios';

const authContext = createContext<{ user: string, signin: Function }>({
    user: '',
    signin: () => { }
});

const useAuth = () => {
    return useContext(authContext)
}

const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
    const auth = useProvideAuth()

    axios.interceptors.response.use(function (response) {

        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            auth.signout()
        }
        return Promise.reject(error);
    });

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

const useProvideAuth = () => {
    const [user, setUser] = useState("");

    const signin = (username: string, password: string, success: Function, fail: Function) => {
        let data = new FormData()
        data.append('name', username)
        data.append('password', password)
        axios({
            method: 'post',
            url: '/tasks/login',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res.data)
            if (res.data === 'Success') {
                setUser(username);
                success()
            }
        }).catch(rej => {
            if (rej.response.status === 401) {
                setUser('');
                fail()
            }
        })
    };

    const signout = () => {
        setUser('')
    }

    return {
        user,
        signin,
        signout
    };
}

interface Props {
    children: React.ReactNode;
    path: string;
    elementType?: keyof JSX.IntrinsicElements;
}

function PrivateRoute({ children, ...rest }: Props) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
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

export { useAuth, ProvideAuth, PrivateRoute } 