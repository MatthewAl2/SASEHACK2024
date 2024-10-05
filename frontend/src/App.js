import { PrimeReactProvider } from 'primereact/api';
import Home from './components/homepage';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your desired theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 


function App() {
  return (
    <PrimeReactProvider>
        <Home />
    </PrimeReactProvider>
  );
}

export default App;
