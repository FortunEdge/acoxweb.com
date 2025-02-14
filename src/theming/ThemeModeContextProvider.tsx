import { ThemeOptions } from '@mui/material'
import { ReactNode, createContext, useState } from 'react'
import DarkTheme from './DarkTheme'
import LightTheme from './LightTheme'

export interface ThemeModeContextProviderProps {
    children: ReactNode
}

export interface ThemeModeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
    getThemeOptions: () => ThemeOptions;
}

export enum ThemeType {
    LIGHT = 'light',
    DARK = 'dark'
}

export const ThemeModeContext = createContext<ThemeModeContextType>({theme:ThemeType.LIGHT, toggleTheme: () => {}, getThemeOptions: () => ({})})

const ThemeModeContextProvider = ({children}: ThemeModeContextProviderProps) => {
    const [theme, setMode] = useState<ThemeType>(ThemeType.LIGHT)

    const toggleTheme = () => {
        setMode(previous => previous === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT)
    }

    const getThemeOptions = () => {
        switch (theme) {
            case ThemeType.DARK:
                return DarkTheme
            case ThemeType.LIGHT:
            default:
                return LightTheme
        }
    }


    return (
        <ThemeModeContext.Provider value={{theme, toggleTheme, getThemeOptions}}>
            {children}
        </ThemeModeContext.Provider>
    )
}

export default ThemeModeContextProvider