import { createContext, useContext, useReducer } from "react";





const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state, user: action.payload, isAuthenticated: true
            }
        case 'logOut':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            throw new Error('Unknown Action')
    }
}

const FAKE_USER = {
    name: "name",
    email: "email@gmail.com",
    password: "password",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYEo4_zp8KCaTngzcGvB4ZwQ4HxHsIsPjX_Q&s"
}

function AuthProvider({ children }) {



    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({
                type: "login",
                payload: FAKE_USER
            })
        }
    }

    function logOut() {
        dispatch({
            type: "logOut"
        })
    }

    return <AuthContext.Provider
        value={{
            user, isAuthenticated, login, logOut
        }}
    >
        {
            children
        }
    </AuthContext.Provider>
}



function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("Context Was Used Outside Provider")
    }
    return context
}


export { AuthProvider, useAuth }