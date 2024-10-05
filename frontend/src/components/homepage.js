import React from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import AdvancedDemo from './advanceddemo'; 

function Home() {
    const items = [
        { label: 'Home', icon: 'pi pi-home' },
        { label: 'About', icon: 'pi pi-info-circle' },
        { label: 'Contact', icon: 'pi pi-envelope' }
    ];

    const start = <img alt="logo" src="https://primereact.org/images/logo.png" height="40" />;
    const end = <Button label="Sign Up" icon="pi pi-user" className="p-button-rounded" />;

    return (
        <div className="App">
            {/* Navbar */}
            <Menubar model={items} start={start} end={end} />

            {/* Hero Section */}
            <div className="hero">
                <h1>Welcome to PrimeReact</h1>
                <p>Build beautiful, performant UI with PrimeReact components.</p>
                <Button label="Get Started" icon="pi pi-arrow-right" className="p-button-success p-button-lg" />
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
                <p>© 2024 PrimeReact Homepage. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
