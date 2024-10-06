import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { Avatar } from 'primereact/avatar';
import { Skeleton } from 'primereact/skeleton';
import { useEffect } from 'react';
import { Divider } from 'primereact/divider';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import Navbar from '../components/navbar';
import { userGlobalID } from '../pages/loginPage';


export function ProfilePage() {
    const easeLogo = "../images/Ease Logo.png";
    const profileImage = "../images/Profile_image.png";
    const solidBlackImage = "..images/Solid_black.png";
    const defaultImage = "..images/default.png";
    
    
    const [username, setUsername] = useState("USER NAME");
    const [pomodoroValue, setValue] = useState(5);
    const [pomodoroChecked, setChecked] = useState(false);
    const [progress, setProgress] = useState(50)
    const [level, setLevel] = useState(1)

    const userLoggedIn = () => {
        if (userGlobalID === -1) {
            return false;
        } 
        else {
            return true
        }
    }

    const achievements =[
        {title: 'Welcome to EASE', description: 'You made a account!', unlocked:true, imagesrc:easeLogo },
        {title: 'Establishing yourself', description: 'You edited your profile!', unlocked:true, imagesrc:profileImage},
        {title: 'Getting it done', description: 'You completed a task!', unlocked:true, imagesrc:defaultImage},
        {title: 'Level Up!', description: 'You leveled up!', unlocked:true, imagesrc:defaultImage},
        {title: 'Achievement 5', description: 'This is hard', unlocked:false, imagesrc:defaultImage},
        {title: 'Achievement 6', description: '6th achievment', unlocked:false, imagesrc:defaultImage},
        {title: 'Achievement 7', description: 'Testing!', unlocked:false, imagesrc:defaultImage},
        {title: 'Achievement 8', description: 'Final Test Achievment!', unlocked:false, imagesrc:defaultImage},
    ];

    useEffect(() => {
        const parentContainer = document.querySelector('.parent-container');
        if (parentContainer) {
            parentContainer.style.display = 'flex';
            parentContainer.style.justifyContent = 'center'; // Center horizontally
            parentContainer.style.alignItems = 'center';  
            parentContainer.style.marginTop = "0px"        // Full height of the viewport
        }
    }, []);

    return (
        <div className="App" >
                <Navbar userLoggedIn={userLoggedIn}/>


            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '10px' }}>
                <p style={{ margin: 0, marginBottom: '0px'}}>Level {level}</p>
                <ProgressBar value={progress} style={{ flex: 1, marginBottom: '0px', maxWidth:'1430px'}} />
            </div>



            <h1 style={{marginBottom:'0px'}}>Profile</h1>
            <Divider />
                
                <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>

                <Card style={{border: '4px solid #00b4d8',borderRadius: '8px', marginLeft: '20px', marginTop: '0px', width: '300px', height: '400px'}}>
                        <div style={{marginLeft: '0px', marginTop: '20px', maxWidth: '300px', justifyContent: 'center', alignItems: 'center' }}>  
                            <Avatar image={profileImage} className="mr-2" shape='circle' style={{ width: '8rem', height: '8rem', borderRadius: '50%', border: '4px solid #00b4d8', padding: '0.2rem', marginLeft: '70px' }} ></Avatar>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="pi pi-user" style={{ marginRight: '10px', marginTop: '0px' }}></i>
                                    <p style={{ marginBottom: '0', marginTop: '0px' }}>{username}</p>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                        <Button label="Change Profile Picture" style={{ marginTop: '10px', marginBottom: '10px', marginLeft:'30px'}} />
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginTop: '5px', marginBottom: '5px', marginLeft:'20px'}}/>
                        <Button label="Change Name" style={{ flexShrink: 0, marginTop: '0px', marginBottom: '10px', whiteSpace: 'nowrap', marginLeft: '55px' }} />

                    </Card>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


                        <Card style={{border: '2px solid #00b4d8',borderRadius: '8px', marginLeft: '20px', marginTop: '10px',maxWidth: '400px' }}>
                            <div className="Pomodoro" style={{margin:'10px'}}> 
                                <p style={{ display: 'flex', alignItems: 'center', marginBottom:'5px'}}>
                                    <i className="pi pi-hourglass" style={{ marginRight: '10px', marginTop: '0' }}></i>
                                    Pomodoro
                                    <InputSwitch checked={pomodoroChecked} onChange={(e) => setChecked(e.value)} style={{ marginLeft: '10px' }} />
                                </p>
                                <InputNumber value={pomodoroValue} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="horizontal"
                                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" step={1} min={0} max={60} disabled={!pomodoroChecked} style={{marginLeft: '15px', marginTop: '0px'}} />
                            </div>
                        </Card>
                    </div>
                </div>

                
            

            <h1>Achievements</h1>
            <Divider />
            <div className="parent-container" style={{ width: '100vw', height: '100vh' }}>
                <div className="achievment-window" style = {{
                    alignContent: 'center',
                    maxHeight: '500px',
                    overflowY: 'auto', 
                    width: '80rem',
                    margin: '10px',
                    border: '2px solid #00b4d8',
                    borderRadius: '20px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    boxSizing: 'border-box', 
                    marginTop: '0px'
                    
                }}>
                    
                    <ul className="grid" style={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)',  
                        gap: '1rem',
                        listStyle: 'none'
                    }}>
                        {achievements.map((item, index) => (
                            <Card className="achievement item" style={{
                                marginBottom: '0.5rem',
                                backgroundColor: '#a2d9a1', 
                                border: '2px solid #00b4d8',    
                                borderRadius: '8px',        
                                padding: '1rem',   
                                }}>
                                <div className="flex" style={{ alignItems: 'center'}}>
                                    {item.unlocked ? (
                                        <> 
                                            <Avatar image={item.imagesrc} className="mr-2" shape='circle' style={{width: '4rem', height: '4rem', borderRadius: '50%', border: '2px solid #efda6b', padding: '0.2rem', }}/>
                                            <div style={{ flex: '1', marginLeft: '0,5rem' }}>
                                                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>{item.title}</h4> 
                                                <p style={{ margin: '0', fontSize: '0.875rem' }}>{item.description}</p> 
                                            </div>
                                        </>
                                    ): (
                                        <>
                                            <Avatar image={solidBlackImage} className="mr-2" shape='circle' style={{width: '4rem', height: '4rem', borderRadius: '50%', border: '2px solid #FF6961', padding: '0.2rem', }}/>
                                            <div style={{ flex: '1', marginLeft: '0.5rem' }}>
                                                <Skeleton width="75%" className="mb-2" style={{
                                                    backgroundColor: '#003d5d', // Custom background color for text skeleton
                                                    animationBackgroundColor: '#003d5d', // Custom shimmer color for text
                                                    animation: 'none'
                                                }} />
                                                <Skeleton width="50%" animation= "none" backgroundColorcolor= '#003d5d' style={{
                                                    backgroundColor: '#003d5d', // Custom background color for text skeleton
                                                    animationBackgroundColor: '#003d5d', // Custom shimmer color for text
                                                    animation: 'wave'
                                                }} />
                                            </div>
                                        </>
                                        
                                    )}
                                </div>
                            </Card> 
                        ))}
                    </ul>
                </div>
            </div>
            

            
            {/* Footer */}
            <footer className="footer">
                <p></p>
            </footer>
        </div>
    );
}