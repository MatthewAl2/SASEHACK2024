import React, { useState, useEffect, cloneElement } from 'react';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { Avatar } from 'primereact/avatar';
import { Skeleton } from 'primereact/skeleton';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function ProfilePage() {
    const easeLogo = "../images/Ease Logo.png";
    const solidBlackImage = "../images/Solid_black.png"; // Fixed path
    const defaultImage = "../images/default.png";

    const [username, setUsername] = useState("USER NAME");
    const [pomodoroValue, setPomodoroValue] = useState(5);
    const [pomodoroChecked, setPomodoroChecked] = useState(false);
    const [progress, setProgress] = useState(50);
    const [level, setLevel] = useState(1);
    const [profileImage, setProfileImage] = useState("../images/profile.jpg"); // Added state for profile image

    // New states for personal information
    const [fullName, setFullName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [phone, setPhone] = useState("123-456-7890");
    const [address, setAddress] = useState("123 Main St, City, State");
    const [isEditing, setIsEditing] = useState(false);

    // New states for social media links
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const achievements = [
        { title: 'Welcome to EASE', description: 'You made an account!', unlocked: true, imagesrc: easeLogo },
        { title: 'Establishing yourself', description: 'You edited your profile!', unlocked: true, imagesrc: profileImage },
        { title: 'Getting it done', description: 'You completed a task!', unlocked: true, imagesrc: defaultImage },
        { title: 'Level Up!', description: 'You leveled up!', unlocked: true, imagesrc: defaultImage },
        { title: 'Achievement 5', description: 'This is hard', unlocked: false, imagesrc: defaultImage },
        { title: 'Achievement 6', description: '6th achievement', unlocked: false, imagesrc: defaultImage },
        { title: 'Achievement 7', description: 'Testing!', unlocked: false, imagesrc: defaultImage },
        { title: 'Achievement 8', description: 'Final Test Achievement!', unlocked: false, imagesrc: defaultImage },
    ];

    useEffect(() => {
        const parentContainer = document.querySelector('.parent-container');
        if (parentContainer) {
            parentContainer.style.display = 'flex';
            parentContainer.style.justifyContent = 'center';
            parentContainer.style.alignItems = 'center';
            parentContainer.style.marginTop = "0px";
        }
    }, []);

        // Load stored data from localStorage when the component mounts
        useEffect(() => {
            const storedFullName = localStorage.getItem('fullName');
            const storedEmail = localStorage.getItem('email');
            const storedPhone = localStorage.getItem('phone');
            const storedAddress = localStorage.getItem('address');
            const storedFacebook = localStorage.getItem('facebook');
            const storedTwitter = localStorage.getItem('twitter');
            const storedInstagram = localStorage.getItem('instagram');
            const storedLinkedin = localStorage.getItem('linkedin');
    
            if (storedFullName) setFullName(storedFullName);
            if (storedEmail) setEmail(storedEmail);
            if (storedPhone) setPhone(storedPhone);
            if (storedAddress) setAddress(storedAddress);
            if (storedFacebook) setFacebook(storedFacebook);
            if (storedTwitter) setTwitter(storedTwitter);
            if (storedInstagram) setInstagram(storedInstagram);
            if (storedLinkedin) setLinkedin(storedLinkedin);
        }, []);

    // Function to increase progress
    const increaseProgress = () => {
        if (progress < 100) {
            setProgress(prevProgress => {
                const newProgress = prevProgress + 10;
                if (newProgress >= 100) {
                    setLevel(level + 1);
                    return 0; // Reset progress after leveling up
                }
                return newProgress;
            });
        }
    };

    // Handle file change for profile picture
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        console.log(file); // Check if the file input is working
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

        // Save personal information to local storage whenever it changes
        useEffect(() => {
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);
            localStorage.setItem('phone', phone);
            localStorage.setItem('address', address);
            localStorage.setItem('facebook', facebook);
            localStorage.setItem('twitter', twitter);
            localStorage.setItem('instagram', instagram);
            localStorage.setItem('linkedin', linkedin);
        }, [fullName, email, phone, address, facebook, twitter, instagram, linkedin]);

    return (
        <div className="App">
            <Navbar />

            {/* Level and ProgressBar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '10px' }}>
                <p style={{ margin: 0 }}>Level {level}</p>
                <ProgressBar value={progress} style={{ flex: 1, maxWidth: '1430px' }} />
            </div>

            {/* Profile Section */}
            <h1 style={{ textAlign: 'center'}}>Profile</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                borderTop: '1px solid #ccc'
            }} />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Card style={{ border: '2px solid #00b4d8', borderRadius: '8px', width: '300px', height: '360px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: '8rem', height: '8rem', margin: '0 auto' }}>
                            {/* Avatar with embedded profile icon */}
                            <Avatar image={profileImage} shape="circle" style={{ width: '8rem', height: '8rem', border: '4px solid #00b4d8' }}>
                            </Avatar>
                        </div>
                        <p>{username}</p>
                        {/* File input for changing profile picture */}
                        <input type="file" accept="image/*" onChange={handleProfilePictureChange} style={{ display: 'none' }} id="profilePicInput" />
                        <label htmlFor="profilePicInput">
                            <Button label="Upload New Picture" type="button" style={{marginBottom: '10px'}} />
                        </label>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '10px' }} />
                        <Button label="Change Name" />
                    </div>
                </Card>

                {/* New Personal Information Card */}
                <Card style={{ border: '2px solid #00b4d8', borderRadius: '8px', maxWidth: '600px', height: '360px', marginLeft: '50px' }}>
                <div style={{ padding: '10px' }}>
                    <h3>Personal Information</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ width: '100px', marginRight: '10px' }}>Full Name:</label>
                        <InputText 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            disabled={!isEditing} 
                            placeholder="Full Name" 
                            style={{ flex: 1 }} 
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ width: '100px', marginRight: '10px' }}>Email:</label>
                        <InputText 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            disabled={!isEditing} 
                            placeholder="Email" 
                            style={{ flex: 1 }} 
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ width: '100px', marginRight: '10px' }}>Phone:</label>
                        <InputText 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            disabled={!isEditing} 
                            placeholder="Phone" 
                            style={{ flex: 1 }} 
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ width: '100px', marginRight: '10px' }}>Address:</label>
                        <InputText 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            disabled={!isEditing} 
                            placeholder="Address" 
                            style={{ flex: 1 }} 
                        />
                    </div>
                    <div>
                        <Button 
                            label={isEditing ? "Save Changes" : "Edit"} 
                            onClick={() => {
                                if (isEditing) {
                                    // Save changes logic can go here
                                }
                                setIsEditing(!isEditing); 
                            }} 
                            style={{ marginTop: '10px'}} 
                        />
                    </div>
                </div>
            </Card>
            </div>

                {/* Social Media Links Card */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Card style={{ border: '2px solid #00b4d8', borderRadius: '8px', maxWidth: '400px', height: '360px' }}>
                    <div style={{ padding: '10px' }}>
                        <h3>Social Media Links</h3>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '8px', color: '#3b5998' }} />
                            <InputText 
                                value={facebook} 
                                onChange={(e) => setFacebook(e.target.value)} 
                                placeholder="Facebook URL" 
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '8px', color: '#1DA1F2' }} />
                            <InputText 
                                value={twitter} 
                                onChange={(e) => setTwitter(e.target.value)} 
                                placeholder="Twitter URL" 
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '8px', color: '#C13584' }} />
                            <InputText 
                                value={instagram} 
                                onChange={(e) => setInstagram(e.target.value)} 
                                placeholder="Instagram URL" 
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '8px', color: '#0077B5' }} />
                            <InputText 
                                value={linkedin} 
                                onChange={(e) => setLinkedin(e.target.value)} 
                                placeholder="LinkedIn URL" 
                            />
                        </div>
                    </div>
                </Card>


                {/* Pomodoro Section */}
                <Card style={{ border: '2px solid #00b4d8', borderRadius: '8px', maxWidth: '400px', marginLeft: '50px' }}>
                    <div style={{ padding: '10px' }}>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            <i className="pi pi-hourglass" style={{ marginRight: '10px' }}></i>
                            Pomodoro
                            <InputSwitch checked={pomodoroChecked} onChange={(e) => setPomodoroChecked(e.value)} style={{ marginLeft: '10px' }} />
                        </p>
                        <InputNumber value={pomodoroValue} onValueChange={(e) => setPomodoroValue(e.value)} showButtons
                            buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            step={1} min={0} max={60} disabled={!pomodoroChecked} />
                    </div>
                </Card>
            </div>

            {/* Achievements Section */}
            <h1 style={{ textAlign: 'center'}}>Achievements</h1>
            <div style={{ borderTop: '1px solid #ccc', maxWidth: '1000px', margin: '0 auto' }} />

            <div className="parent-container" style={{ width: '100vw', height: '100vh' }}>
                <div className="achievment-window" style={{
                    maxHeight: '500px', overflowY: 'auto', width: '80rem', border: '2px solid #00b4d8', borderRadius: '20px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', marginTop: '20px'
                }}>
                    <ul className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', listStyle: 'none' }}>
                        {achievements.map((item, index) => (
                            <Card className="achievement-item" key={index} style={{
                                backgroundColor: '#a2d9a1', border: '2px solid #00b4d8', borderRadius: '8px', padding: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {item.unlocked ? (
                                        <>
                                            <Avatar image={item.imagesrc} shape="circle" style={{
                                                width: '4rem', height: '4rem', border: '2px solid #efda6b', padding: '0.2rem'
                                            }} />
                                            <div style={{ marginLeft: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
                                                <p style={{ margin: 0 }}>{item.description}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Avatar image={solidBlackImage} shape="circle" style={{
                                                width: '4rem', height: '4rem', border: '2px solid #FF6961', padding: '0.2rem'
                                            }} />
                                            <div style={{ marginLeft: '1rem' }}>
                                                <Skeleton width="75%" className="mb-2" />
                                                <Skeleton width="50%" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
