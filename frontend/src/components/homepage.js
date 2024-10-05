import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { TabMenu } from 'primereact/tabmenu'; // Import TabMenu
import Card from './card'; // Import the Card component

export default function Home() {
    const initialCards = [
        { id: 1, title: "Shower", content: "Go shower cs major", isEditing: false },
        { id: 2, title: "Study", content: "Study for the exam", isEditing: false },
        { id: 3, title: "Exercise", content: "Do some exercise", isEditing: false },
        { id: 4, title: "Grocery Shopping", content: "Buy groceries for the week", isEditing: false }, // New card
    ];

    const [cards, setCards] = useState(initialCards);
    const [activeTab, setActiveTab] = useState('Tasks'); // State to track the active tab

    const toggleEdit = (id) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id
                    ? { ...card, isEditing: !card.isEditing }
                    : card
            )
        );
    };

    const saveCard = (id) => {
        toggleEdit(id); // Just toggle editing mode
    };

    const updateCardContent = (id, field, value) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id
                    ? { ...card, [field]: value }
                    : card
            )
        );
    };

    const items = [
        { label: 'Home', icon: 'pi pi-home' },
        { label: 'About', icon: 'pi pi-info-circle' },
        { label: 'Contact', icon: 'pi pi-envelope' }
    ];

    const start = <img alt="logo" src="https://primereact.org/images/logo.png" height="40" />;
    const end = <Button label="Sign Up" icon="pi pi-user" className="p-button-rounded" />;

    const tabItems = [
        { label: 'Tasks', icon: 'pi pi-list' },
        { label: 'Completed', icon: 'pi pi-check' },
        { label: 'Archived', icon: 'pi pi-archive' }
    ];

    return (
        <div className="App">
            <Menubar model={items} start={start} end={end} />

            <div className="hero" style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to PrimeReact</h1>
                <p>Build beautiful, performant UI with PrimeReact components.</p>
                <Button label="Submit" />
            </div>

            {/* Tab Menu Above Card Container */}
            <TabMenu 
                model={tabItems} 
                activeIndex={tabItems.findIndex(item => item.label === activeTab)} 
                onTabChange={(e) => setActiveTab(e.value.label)} 
                style={{ marginTop: '20px' }} 
            />

            <div
                className="card-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center', // Center cards in the container
                    width: '100%',
                    height: '70vh',
                    padding: '10px',
                    overflow: 'auto',
                }}
            >
                {/* Render cards based on the active tab */}
                {activeTab === 'Tasks' && cards.map((card) => (
                    <div key={card.id} style={{ width: '20%', margin: '0 10px' }}> {/* Adjust the width and margin */}
                        <Card
                            card={card}
                            onEditToggle={() => toggleEdit(card.id)}
                            onSave={() => saveCard(card.id)}
                            onCancel={() => toggleEdit(card.id)}
                            onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                        />
                    </div>
                ))}
                {activeTab === 'Completed' && <p>No completed tasks yet.</p>}
                {activeTab === 'Archived' && <p>No archived tasks yet.</p>}
            </div>

            <footer className="footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>© 2024 PrimeReact Homepage. All rights reserved.</p>
            </footer>
        </div>
    );
}
