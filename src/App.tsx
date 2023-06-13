import './App.css';
import SelfCard from './components/SelfCard';
import CssVarsProvider from './theming/CssVarsProvider';

function App() {
  return (
    <CssVarsProvider>
      <SelfCard/>
    </CssVarsProvider>
  );
}

export default App;
