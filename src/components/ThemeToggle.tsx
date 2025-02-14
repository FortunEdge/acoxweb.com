import { DarkMode, LightMode } from '@mui/icons-material'
import { FormControlLabel, Paper, PaperProps, Switch, SwitchProps, styled } from '@mui/material'
import { useContext } from 'react'
import { ThemeModeContext, ThemeType } from '../theming/ThemeModeContextProvider'

interface ThemeToggleProps {
    includeLabel?: boolean
}


const IconBg = styled(Paper)<PaperProps>(({theme}) => ({
    width: 20,
    height: 20,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.text.primary
}))

const ToggleSwitch = (switchProps: Omit<SwitchProps, 'icon'|'checkedIcon'>) => (
    <Switch 
        icon={<IconBg elevation={3}><LightMode sx={{fontSize: 14, color: 'background.default'}}/></IconBg>}
        checkedIcon={<IconBg elevation={3}><DarkMode sx={{fontSize: 16, color: 'background.default'}}/></IconBg>}
        {...switchProps}/>
)

/**
 * A theme toggle switch that will toggle the theme between
 * dark/light no matter where it is placed in the app
 */
const ThemeToggle = ({includeLabel = false}: ThemeToggleProps) => {
    const {theme, toggleTheme} = useContext(ThemeModeContext)

    if(includeLabel) {
        return (
            <FormControlLabel
                control={<ToggleSwitch checked={theme == ThemeType.DARK} onChange={toggleTheme}/>}
                label='Theme'
                labelPlacement='start'
            />)
    }

    return (
        <ToggleSwitch checked={theme == ThemeType.DARK} onChange={toggleTheme}/>
    )
}

export default ThemeToggle