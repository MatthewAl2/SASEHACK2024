import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { Skeleton } from 'primereact/skeleton';
const showerPath = "images\shower.jpg"


function Home() {
    const items = [
        { label: 'EASE', icon: 'pi pi-home' },
        {label: 'Profile', icon: 'pi pi-profile'}
        
    ];

    const start = <img alt="logo" src="https://primereact.org/images/logo.png" height="40" />;
    const end = <Button label="Sign Up" icon="pi pi-user" className="p-button-rounded" />;
    const username = "USER NAME"
    const [pomodoroValue, setValue] = useState(5);
    const [pomodoroChecked, setChecked] = useState(false);

    return (
        <div className="App">
            {/* Navbar */}
            <Menubar model={items} start={start} end={end} />
            <h1>Profile</h1>
            <div className="User name"> 
                <header>Username: {username}</header> 
                <Button label = "Change Name"/>

                
            </div>
            <div className="Pomodoro"> 
                Pomodoro
                <InputSwitch checked={pomodoroChecked} onChange={(e) => setChecked(e.value)} />
                <InputNumber value={pomodoroValue} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="horizontal"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" step={1} min={0} max={60} />
            </div>

            
            <h1>Achievements</h1>
            <div className="border-round border-1 surface-border p-4" style = {{
                maxHeight: '500px',
                overflowY: 'auto',
            }}>
                <ul className="m-0 p-0 list-none" style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)',  /* Two equal columns */
                    gap: '1rem'  /* Space between items */
                }}>
                    <li className="mb-3">
                    <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="75%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li className="mb-3">
                        <div className="flex">
                            <img src="https://primereact.org/images/logo.png" className="mr-2" style={{width: '4rem', height: '4rem', borderRadius: '50%'}}/>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="75%" className="mb-2"></Skeleton>
                                <Skeleton width="50%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li className="mb-3">
                        <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="100%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="100%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li className="mb-3">
                    <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="75%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li className="mb-3">
                        <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="75%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li className="mb-3">
                        <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="100%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                            <div style={{ flex: '1' }}>
                                <Skeleton width="100%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                        </div>
                    </li>
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
