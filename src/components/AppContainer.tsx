import { Container, ContainerProps, styled } from '@mui/material'

const AppContainer = styled(Container)<ContainerProps>(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    margin: 0,
    padding: 0
}))

export default AppContainer