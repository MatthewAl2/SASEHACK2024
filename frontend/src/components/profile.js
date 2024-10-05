import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { Avatar } from 'primereact/avatar';
import { Skeleton } from 'primereact/skeleton';
const showerPath = "images\shower.jpg"
const space = "       "


function Home() {
    const items = [
        { label: 'EASE', icon: 'pi pi-home' },
        {label: 'Profile', icon: 'pi pi-profile'}
        
    ];

    const start = <img alt="logo" src="https://primereact.org/images/logo.png" height="40" />;
    const end = <Button icon="pi pi-user" className="p-button-rounded" />;
    const [username, setUsername] = useState("USER NAME");
    const [pomodoroValue, setValue] = useState(5);
    const [pomodoroChecked, setChecked] = useState(false);

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

    return (
        <div className="App">
            {/* Navbar */}
            <Menubar model={items} start={start} end={end} />
            <div className="User name"> 
                <h1>Profile</h1>
                <p>Username: {username}</p>
                <Button label = "Change Name"/>
                
                
            </div>
            <div className="Pomodoro"> 
                Pomodoro
                <InputSwitch checked={pomodoroChecked} onChange={(e) => setChecked(e.value)} />
                <InputNumber value={pomodoroValue} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="horizontal"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" step={1} min={0} max={60} disabled={!pomodoroChecked} />
            </div>

            
            <h1>Achievements</h1>
            <div className="border-round border-1 surface-border p-4" style = {{
                maxHeight: '500px',
                overflowY: 'auto',
                backgroundColor: '#956BA9',  
                borderColor: '#f0f0f5',
                border: '8px solid #ccc',    
                borderRadius: '8px',
            }}>
                
                <ul className="m-0 p-0 list-none" style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)',  
                    gap: '1rem',
                    listStyle: 'none'
                }}>
                    {achievements.map((item, index) => (
                        <li className="mb-3" style={{
                            marginBottom: '0.5rem',
                            backgroundColor: '#a2d9a1', 
                            border: '4px solid #007bff',    
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
                        </li> 
                    ))}
                </ul>
            </div>

            

            
            {/* Footer */}
            <footer className="footer">
                <p></p>
            </footer>
        </div>
    );
}

export default Home;
