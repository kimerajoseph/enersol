import React , { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
//{ } imports a module. without {}, you import a function

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser ] = useState()
//SIGNUP FUNCTION
function signup(email,password){
return auth.createUserWithEmailAndPassword(email,password)
}
//SET USER TO CURRENT USER USING FIREBASE
useEffect(() => {
    auth.onAuthStateChanged(user=>{
        setCurrentUser(user)
    })  
}, [])

    const value = {
        currentUser
    }
    
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}
