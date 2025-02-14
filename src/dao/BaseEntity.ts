import { FirestoreDataConverter } from 'firebase/firestore'
import FirebaseDao from './FirebaseDao'

/**
 * The base structure for every database entity
 */
export default abstract class BaseEntity<T> {
    private _id: any

    get id(): any {
        return this._id
    }

    abstract get collectionPath(): string

    

}