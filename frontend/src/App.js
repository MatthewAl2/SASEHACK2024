import { PrimeReactProvider } from 'primereact/api';
import Profile from './components/profile';
import 'primereact/resources/themes/vela-green/theme.css'; // Choose your desired theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 


function App() {
  return (
    <PrimeReactProvider>
        <Profile />
    </PrimeReactProvider>
  );
}

export default App;
