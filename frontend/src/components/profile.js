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
import Ease_Logo from './Ease Logo.png';
const showerPath = "images\shower.jpg"
const space = "       "


function Home() {
    const items = [
        { label: 'Home', icon: 'pi pi-home' },
        { label: 'Profile', icon: 'pi pi-user' }
    ];


    const start = <img alt="logo" src={Ease_Logo} height="40" />;
    const end = <Button label="Sign Up" icon="pi pi-user" className="p-button-rounded" />;
    const [username, setUsername] = useState("USER NAME");
    const [pomodoroValue, setValue] = useState(5);
    const [pomodoroChecked, setChecked] = useState(false);
    const [progress, setProgress] = useState(50)
    const [level, setLevel] = useState(1)


    const achievements =[
        {title: 'Achievement 1', description: 'This is your first achievment!', unlocked:true},
        {title: 'Achievement 2', description: 'Keep going!', unlocked:true},
        {title: 'Achievement 3', description: 'Good job!', unlocked:false},
        {title: 'Achievement 4', description: 'You did something', unlocked:true},
        {title: 'Achievement 5', description: 'This is hard', unlocked:false},
        {title: 'Achievement 6', description: '6th achievment', unlocked:true},
        {title: 'Achievement 7', description: 'Testing!', unlocked:true},
        {title: 'Achievement 8', description: 'Final Test Achievment!', unlocked:true},
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
        <div className="App" style={{backgroundColor: '#eda6a0'}}>
            {/* Navbar */}
            <Menubar model={items} start={start} end={end} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '10px' }}>
                <p style={{ margin: 0, marginBottom: '0px'}}>Level {level}</p>
                <ProgressBar value={progress} style={{ flex: 1, marginBottom: '0px', maxWidth:'1430px'}} />
            </div>

            <h1 style={{marginBottom:'0px'}}>Profile</h1>
                <Card style={{border: '4px solid #FFFFFF',borderRadius: '8px', marginLeft: '20px', marginTop: '0px', maxWidth: '300px'}}>
                    <div style={{ margin: '0px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '0px', marginTop: '0px'}}>
                            <i className="pi pi-user" style={{ marginRight: '10px', marginTop: '0px' }}></i>
                            <p style={{ marginBottom: '0', marginTop: '0px' }}>Username: {username}</p>
                        </div>
                    </div>

                    <Button label="Change Name" style={{ marginTop: '0px', marginBottom: '10px', marginLeft:'30px'}} />
                </Card>


            <Card style={{border: '4px solid #FFFFFF',borderRadius: '8px', marginLeft: '20px', marginTop: '10px',maxWidth: '400px' }}>
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
            

            <h1>Achievements</h1>
            <Divider />
            <div className="parent-container" style={{ width: '100vw', height: '100vh' }}>
                <div className="achievment-window" style = {{
                    alignContent: 'center',
                    maxHeight: '500px',
                    overflowY: 'auto', 
                    width: '80rem',
                    margin: '10px',
                    border: '2px solid #FFFFFF',
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
                                border: '4px solid #FFFFFF',    
                                borderRadius: '8px',        
                                padding: '1rem',   
                                }}>
                                <div className="flex" style={{ alignItems: 'center'}}>
                                    {item.unlocked ? (
                                        <>
                                            <Avatar image="https://primereact.org/images/logo.png" className="mr-2" style={{width: '4rem', height: '4rem', borderRadius: '50%', border: '4px solid #efda6b', padding: '0.2rem', }}/>
                                            <div style={{ flex: '1', marginLeft: '0,5rem' }}>
                                                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>{item.title}</h4> 
                                                <p style={{ margin: '0', fontSize: '0.875rem' }}>{item.description}</p> 
                                            </div>
                                        </>
                                    ): (
                                        <>
                                            <Skeleton shape="circle" size="4rem" className="mr-2" style={{
                                            backgroundColor: '#003d5d', 
                                            animationBackgroundColor: '#003d5d',
                                            animation: 'none'
                                        }} />
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

export default Home;
