import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your desired theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUpPage';  

// Pages
import Home from './components/homepage';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signUpPage" element={<SignUp />} />
        </Routes>
    </PrimeReactProvider>
  );
}

export default App;
