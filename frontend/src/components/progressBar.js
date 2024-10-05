
const ProgressBar = ({ maxExperience, currentExperience }) => {
// Calculate progress percentage
const progressPercentage = Math.min((currentExperience / maxExperience) * 100, 100);

// Inline styles for the progress bar container and fill
const progressBarStyles = {
   width: '100%',
   backgroundColor: '#e0e0e0',
   borderRadius: '5px',
   overflow: 'hidden',
   position: 'relative',
   height: '25px',
};

const progressFillStyles = {
   height: '100%',
   width: `${progressPercentage}%`,
   backgroundColor: '#4caf50',
   transition: 'width 0.25s ease-in-out',
};

const progressTextStyles = {
   position: 'absolute',
   width: '100%',
   textAlign: 'center',
   fontWeight: 'bold',
   color: '#fff',
   lineHeight: '25px',
};

// Not fucntional
useEffect(() => {
   // Define a function to handle the POST request
   const getUserData = async () => {
     try {
       const response = await axios({
         method: 'post',
         url: 'http://127.0.0.1:5000/users',
         data: {
           username: userInputtedUsername,   // Use the passed username
           password: userInputtedPassword,   // Use the passed password
           level: 0,                         // User's level default is 0
           xp: 0,                            // User's XP default is 0
           tags: []                          // Default empty array for tags
         }
       });
       console.log('User created:', response.data);  // Handle the created user response
     } catch (error) {
       console.error('Error creating user:', error);  // Handle the error
     }
   };

   createUser();  // Call the function when the component renders
 }, [userInputtedUsername, userInputtedPassword]);  // Add dependencies so it runs when username or password changes



return (
   <div style={progressBarStyles}>
   <div style={progressFillStyles}></div>
   <span style={progressTextStyles}>{`${currentExperience} / ${maxExperience}`}</span>
   </div>
);
};

export default ProgressBar;
