import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ReactNode, useContext } from 'react';
import { ThemeModeContext } from './ThemeModeContextProvider';

export interface CssVarsProviderProps {
    children: ReactNode
}

const CssVarsProvider = ({children} : CssVarsProviderProps) => {
    const {getThemeOptions} = useContext(ThemeModeContext)
    
    return (
        <ThemeProvider theme={getThemeOptions()}>
            {children}
        </ThemeProvider>
    )
}

export default CssVarsProvider;