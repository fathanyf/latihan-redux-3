import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { auth, db } from "../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({});

    const router = useRouter()

    // create user and set for gamepoint data

    const createUser = async (email, password,name) => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', user.uid), {
            name,
            address:'',
            phone:'',
            avatar:'',
            playerId:user.uid,
            createdAt: serverTimestamp()
        })
        await setDoc(doc(db, 'gamepoint', user.uid), {
            totalpoint:0,
            name,
            avatar:'',
            playerId:user.uid,
            updatetAt:serverTimestamp()
        })
    }

    // sign in with google email/password auth

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout  with google email/password auth

    const logout = () => {
        signOut(auth)
        router.push('/auth/signin')
        return 
    }

    // set unsubscribe user 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <UserContext.Provider value={{ createUser, logout, signIn, user, isAuth, setIsAuth }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}