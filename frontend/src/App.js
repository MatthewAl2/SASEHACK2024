import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Home from './components/homepage';

function App() {
  return (
    <PrimeReactProvider>
        <Home />
    </PrimeReactProvider>
  );
}

export default App;
