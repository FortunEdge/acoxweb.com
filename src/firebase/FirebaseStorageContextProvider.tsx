import { FirebaseStorage, getStorage } from 'firebase/storage'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { firebaseApp } from './FirebaseConstants'
import FirebaseContextError from './FirebaseContextError'

type FirebaseStorageContextProviderProps = {
    children: ReactNode
}

type FirebaseStorageContextType = FirebaseStorage | null

const FirebaseStorageContext = createContext<FirebaseStorageContextType | undefined>(undefined)

export const useFirebaseStorage = () => {
    const context = useContext(FirebaseStorageContext)
    if (!context) {
        throw new FirebaseContextError('useFirebaseStorage must be used within a FirebaseStorageProvider')
    }
    return context
}

const FirebaseStorageContextProvider = ({ children }: FirebaseStorageContextProviderProps) => {
    const [storage, setStorage] = useState<FirebaseStorage | null>(null)

    useEffect(() => {
        // Initialize Firebase Storage
        const storageInstance = getStorage(firebaseApp)
        setStorage(storageInstance)
    }, [])

    return (
        <FirebaseStorageContext.Provider value={ storage }>
            {children}
        </FirebaseStorageContext.Provider>
    )
}

export default FirebaseStorageContextProvider