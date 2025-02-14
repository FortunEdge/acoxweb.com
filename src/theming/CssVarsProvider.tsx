import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { ReactNode, useContext, useMemo } from 'react'
import { ThemeModeContext } from './ThemeModeContextProvider'

export interface CssVarsProviderProps {
    children: ReactNode
}

const CssVarsProvider = ({children} : CssVarsProviderProps) => {
    const {getThemeOptions} = useContext(ThemeModeContext)

    const theme = useMemo(() => createTheme(getThemeOptions()), [getThemeOptions])

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default CssVarsProvider