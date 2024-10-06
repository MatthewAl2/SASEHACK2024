import React, { useState, useEffect} from 'react';
import Navbar from '../components/navbar';
import ImageGallery from '../components/gallery';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    // Define styles as JS objects
    const styles = {
        loginPage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            backgroundColor: '#f4f4f4',
        },
        loginContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '640px',
        },
        galleryContainer: {
            marginBottom: '20px',
            width: '100%',
            maxWidth: '640px',
        },
        loginForm: {
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        formGroup: {
            width: '100%',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            fontSize: '14px',
            marginBottom: '5px',
            color: '#333',
        },
        inputText: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
        },
    };

   const navigate = useNavigate();
   const [data, setData] = useState([]);
   const [username , setUsername] = useState('');
   const [password , setPassword] = useState('');

   useEffect(() => {
      const fetchData = async () =>{
      try {
         const {data: response} = await axios.get('http://127.0.0.1:5000/users');
         setData(response);
      } catch (error) {
         console.error(error.message);
      }
   }

   fetchData();
   }, []);

   const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

   const userExists = () => {
   
      for (let i = 0; i < data.length; i++) {
         var user = false;
         if (data[i].username === username && data[i].password === password) {
            user = true;
         }
         if (user) { 
            console.log('User exists');
            navigate('/');
         }
      }
      
   };
    return (
      <>
      <Navbar />
         <div style={styles.loginPage}>
               <div style={styles.loginContainer}>
                  <div style={styles.galleryContainer}>
                     <ImageGallery />
                  </div>
                  <div style={styles.loginForm}>
                     <div style={styles.formGroup}>
                           <label htmlFor="username" style={styles.label}>Username</label>
                           <InputText id="username" type="text" className="p-inputtext-lg" placeholder="Enter your username" style={styles.inputText} onInput={handleUsernameChange}/>
                     </div>

                     <div style={styles.formGroup}>
                           <label htmlFor="password" style={styles.label}>Password</label>
                           <InputText id="password" type="text" className="p-inputtext-lg" placeholder="Enter your password" style={styles.inputText} onInput={handlePasswordChange}/>
                     </div>
                     <Button label="Login" className="p-button-lg" style={{ width: '100%', marginTop: '20px' }} onClick={userExists} />
                     <Button label="Create an Account" className="p-button-lg" style={{ width: '100%', marginTop: '20px' }} onClick={() => navigate( '/signUpPage ')} />

                     
                  </div>
               </div>
         </div>
      </>
    );
}