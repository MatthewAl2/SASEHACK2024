import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your desired theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/homepage';
import LoginPage from './pages/loginPage';
import SignUp from './pages/signUpPage';
import { ProfilePage } from './pages/profile';

function App() {
  return (
    <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signUpPage" element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
    </PrimeReactProvider>
  );
}

export default App;
