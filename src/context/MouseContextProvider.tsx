import { ReactNode, createContext, useEffect, useState } from 'react'

export interface MousePosition {
    x: number,
    y: number,
    hover?: boolean
}

interface MouseContextType {
    position: MousePosition
}

interface MouseContextProviderType {
    children: ReactNode
}

export const MouseContext = createContext<MouseContextType>({position: {x: 0, y: 0}})

const MouseContextProvider = ({children}: MouseContextProviderType) => {
    const [{x, y}, setMousePosition] = useState<MousePosition>({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (event:MouseEvent) => {
            setMousePosition({x: event.clientX, y: event.clientY})
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            )
        }
    }, [])

    return (
        <MouseContext.Provider value={{position: {x, y}}}>
            {children}
        </MouseContext.Provider>
    )
}

export default MouseContextProvider