import { Experimental_CssVarsProvider as MuiCssVarsProvider } from '@mui/material';
import { experimental_extendTheme  as extendTheme} from '@mui/material/styles'
import { ReactNode } from 'react';

export interface CssVarsProviderProps {
    children: ReactNode
}

const theme = extendTheme();

const CssVarsProvider = ({children} : CssVarsProviderProps) => {
    return (
        <MuiCssVarsProvider theme={theme}>
            {children}
        </MuiCssVarsProvider>
    )
}

export default CssVarsProvider;