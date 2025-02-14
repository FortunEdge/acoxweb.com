import { FirebaseApp, initializeApp } from 'firebase/app'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { FIREBASE_CONFIG } from './FirebaseConstants'
import FirebaseContextError from './FirebaseContextError'

type FirebaseAppContextProviderProps = {
    children: ReactNode
}

type FirebaseAppContextType = {
    firebaseApp?: FirebaseApp
}

const FirebaseAppContext = createContext<FirebaseAppContextType | undefined>({})

export const useFirebaseApp = () => {
    const context = useContext(FirebaseAppContext)
    if (!context) {
        throw new FirebaseContextError('useFirebaseApp must be used within a FirebaseAppContextProvider')
    }
    return context
}

const FirebaseAppContextProvider = ({ children }: FirebaseAppContextProviderProps) => {
    const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>()

    useEffect(() => {
        // Initialize Firebase app
        const firebaseApp = initializeApp(FIREBASE_CONFIG)
        setFirebaseApp(firebaseApp)
    }, [])

    return (
        <FirebaseAppContext.Provider value={{firebaseApp}}>
            {children}
        </FirebaseAppContext.Provider>
    )
}

export default FirebaseAppContextProvider