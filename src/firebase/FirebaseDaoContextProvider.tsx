import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import FirebaseDao from '../dao/FirebaseDao'
import { useFirebaseApp } from './FirebaseAppContextProvider'
import FirebaseContextError from './FirebaseContextError'

type FirebaseDaoContextProviderProps = {
    children: ReactNode
}

type FirebaseDaoContextType = {
    firebaseDao?: FirebaseDao
}

export const FirebaseDaoContext = createContext<FirebaseDaoContextType>({})

export const useFirebaseDao = () => {
    const context = useContext(FirebaseDaoContext)
    if (!context) {
        throw new FirebaseContextError('useFirebaseDao must be used within a FirebaseDaoContextProvider')
    }

    return context
}

/** Context provider for the Firebase DAO */
const FirebaseDaoContextProvider = ({children}: FirebaseDaoContextProviderProps) => {
    const {firebaseApp} = useFirebaseApp()

    const [firebaseDao, setFirebaseDao] = useState<FirebaseDao>()

    useEffect(() => {
        if (firebaseApp) {
            setFirebaseDao(new FirebaseDao(firebaseApp))
        }
    }, [firebaseApp])

    return (
        <FirebaseDaoContext.Provider value={{firebaseDao}}>
            {children}
        </FirebaseDaoContext.Provider>
    )
}

export default FirebaseDaoContextProvider