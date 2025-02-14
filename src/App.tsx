import { Paper } from '@mui/material'
import AppContainer from './components/AppContainer'
import FancyCardGrid from './components/FancyCardGrid'
import ThemeToggle from './components/ThemeToggle'
import MouseContextProvider from './context/MouseContextProvider'
import FirebaseAppContextProvider from './firebase/FirebaseAppContextProvider'
import CssVarsProvider from './theming/CssVarsProvider'
import ThemeModeContextProvider from './theming/ThemeModeContextProvider'
import FirebaseDaoContextProvider from './firebase/FirebaseDaoContextProvider'

/**
 * Webapp root element, provides global contexts
 */
function App() {
    return (
        <ThemeModeContextProvider>
            <CssVarsProvider>
                <FirebaseAppContextProvider>
                    <FirebaseDaoContextProvider>
                        <MouseContextProvider>
                            <AppContainer maxWidth='xl'>
                                <Paper>
                                    <ThemeToggle/>
                                </Paper>
                                <FancyCardGrid />
                            </AppContainer>
                        </MouseContextProvider>
                    </FirebaseDaoContextProvider>
                </FirebaseAppContextProvider>
            </CssVarsProvider>
        </ThemeModeContextProvider>
    )
}

export default App
