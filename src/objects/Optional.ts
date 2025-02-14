import NullValueError from '../Errors/NullValueError'

/**
 * Implementation of a class that may-or-may-not contain a value
 * for handling null/undefined potential cleanly. Modeled after
 * the Java Optional class
 */
export default class Optional<T> {
    private _value?: T

    constructor(value?: T) {
        this._value = value
    }

    /**
     * Creates an Optional with the given value. Throws an error if null or undefined are provided
     * @param value value to assign the Optional
     * @typedef T type of value being assigned
     * @returns created Optional object
     * @throws {@link NullValueError} if null or undefined are passed in
     */
    static of<T>(value: T):Optional<T> {
        if (value == null) { // Juggling check catches both undefined and null
            throw new NullValueError('The provided value is null or undefined')
        }

        return new Optional(value)
    }

    /**
     * Creates an Optional with the given value, which may or may not be null
     * @param value value to assign the Optional
     * @typedef T type of the value being assigned
     * @returns created Optional object
     */
    static ofNullable<T>(value: T): Optional<T> {
        return new Optional(value ?? undefined)
    }

    /**
     * Creates an empty Optional
     * @typedef T type of the non-existent value
     * @returns an Optional with no value assigned
     */
    static empty<T>(): Optional<T> {
        return new Optional<T>(undefined)
    }

    get isPresent() {
        return !!this._value
    }

    orElse(otherValue: T) {
        return this._value ?? otherValue
    }


}