class FirebaseContextError extends Error {
    constructor(message:string) {
        super(message)
        this.name = 'FirebaseContextError'
    }
}

export default FirebaseContextError