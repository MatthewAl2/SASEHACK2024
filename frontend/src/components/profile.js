import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import { InputSwitch } from 'primereact/inputswitch';
import AdvancedDemo from './advanceddemo'; 
import { InputNumber } from 'primereact/inputnumber';


function Home() {
    const items = [
        { label: 'EASE', icon: 'pi pi-home' },
        {label: 'Profile', icon: 'pi pi-profile'}
        
    ];

    const start = <img alt="logo" src="https://primereact.org/images/logo.png" height="40" />;
    const end = <Button label="Sign Up" icon="pi pi-user" className="p-button-rounded" />;
    const username = "USER NAME"
    const [pomodoroValue, setValue] = useState(50);
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
                <header> Pomodoro </header>
                <InputSwitch checked={pomodoroChecked} onChange={(e) => setChecked(e.value)} />
                <InputNumber value={pomodoroValue} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="horizontal"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" step={1} min={0} max={60} />
            </div>

            {/* Cards Section */}
            <div className="p-grid p-mt-5 p-px-4">
                {/* Simple Card */}
                <div className="p-col-12 p-md-4">
                    <Card title="Simple Card">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                        </p>
                    </Card>
                </div>

                {/* Additional Cards (if needed) */}
                <div className="p-col-12 p-md-4">
                    <Card title="Fast Development" style={{ textAlign: 'center' }}>
                        <p>Rapidly develop UI components with minimal effort.</p>
                    </Card>
                </div>
                <div className="p-col-12 p-md-4">
                    <Card title="Customizable Themes" style={{ textAlign: 'center' }}>
                        <p>Choose from a variety of customizable themes.</p>
                    </Card>
                </div>
                <div className="p-col-12 p-md-4">
                    <Card title="Rich Components" style={{ textAlign: 'center' }}>
                        <p>Access to a wide variety of reusable UI components.</p>
                    </Card>
                </div>

                {/* Advanced Card Demo */}
                <div className="p-col-12 p-md-4">
                    <AdvancedDemo />  {/* Add the AdvancedDemo component here */}
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
