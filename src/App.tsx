import SelfCard from './components/SelfCard';
import CssVarsProvider from './theming/CssVarsProvider';
import ThemeModeContextProvider from './theming/ThemeModeContextProvider';

function App() {
  return (
    <ThemeModeContextProvider>
      <CssVarsProvider>
        <SelfCard/>
      </CssVarsProvider>
    </ThemeModeContextProvider>
  );
}

export default App;
