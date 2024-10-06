import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function Navbar(props) {
    const navigate = useNavigate();

    const items = [
      { 
         label: 'Home', 
         icon: 'pi pi-home',
         command: () => navigate('/')  // Navigate to the home route
      },
      { 
         label: 'About', 
         icon: 'pi pi-info-circle' 
      },
      { 
         label: 'Contact', 
         icon: 'pi pi-envelope' 
      },
      { 
         label: 'Profile', 
         icon: 'pi pi-user',  // Changed icon for profile
         command: () => navigate('/profile')  // Navigate to the profile route
      }
   ];

    const logo = <img alt="logo" src="../images/Ease Logo.png" height="40" />;

    // Assuming userLoggedIn is passed as a prop
    const { userLoggedIn } = props;

    // Conditionally render login button or profile image
    const login = userLoggedIn ? (
        <div style={styles.profileContainer}>
            <img 
                src="../images/loggedInUser.jpg" 
                alt="Profile" 
                style={styles.profileImage} 
            />
        </div>
    ) : (
        <Button 
            label="Login" 
            icon="pi pi-user" 
            className="p-button-rounded" 
        />
    );

    return (
        <Menubar model={items} start={logo} end={login} />
    );
}

// Inline styles for profile image
const styles = {
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    profileImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',  // Makes it a circle
        objectFit: 'cover',  // Ensures the image is fully contained within the circle
    }
};
