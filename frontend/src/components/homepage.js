import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { TabMenu } from 'primereact/tabmenu';
import Card from './card';
import { Dialog } from 'primereact/dialog';
import Ease_Logo from '../images/Ease Logo.png';
import { Calendar } from 'primereact/calendar';
import DailyCard from './dailycard'; // Import the DailyCard component
import '../styles/home.css'; // Import the CSS file for styles

export default function Home() {
    const initialCards = [];
    const initialDailyChallenges = [
        { id: 1, title: "Drink 2 liters of water", content: "Stay hydrated!", completed: false },
        { id: 2, title: "30 minutes of exercise", content: "Get moving!", completed: false },
        { id: 2, title: "Meal prep", content: "Cook something!", completed: false },

        // Add more daily challenges as needed
    ];

    const loadCards = () => {
        const savedCards = localStorage.getItem('cards');
        return savedCards ? JSON.parse(savedCards) : initialCards;
    };

    const [dailyChallenges, setDailyChallenges] = useState(initialDailyChallenges);
    const [cards, setCards] = useState(loadCards);
    const [activeTab, setActiveTab] = useState('All Tasks');
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardContent, setNewCardContent] = useState('');
    const [displayDialog, setDisplayDialog] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);


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
        toggleEdit(id);
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

        // Functions to handle daily challenges
        const toggleDailyChallengeCompleted = (id) => {
            setDailyChallenges(prevChallenges =>
                prevChallenges.map(challenge =>
                    challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
                )
            );
        };

    const toggleCompleted = (id) => {
        setCards((prevCards) =>
            prevCards.map((card) => {
                if (card.id === id) {
                    const updatedCard = { ...card, completed: !card.completed };
                    const newStatus = updatedCard.completed ? 'Completed' : 'Not Started';
                    return { ...updatedCard, status: newStatus };
                }
                return card;
            })
        );
    };

    const changeCardStatus = (id, newStatus) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id
                    ? { ...card, status: newStatus }
                    : card
            )
        );
    };

    const addCard = () => {
        if (newCardTitle && newCardContent) {
            const newCard = {
                id: cards.length + 1,
                title: newCardTitle,
                content: newCardContent,
                isEditing: false,
                completed: false,
                status: 'Not Started',
                startDate: startDate,
                dueDate: dueDate,
            };
            setCards([...cards, newCard]);
            setNewCardTitle('');
            setNewCardContent('');
            setStartDate(null);
            setDueDate(null);
            setDisplayDialog(false);
        }
    };

    const removeCard = (id) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };

    const updateCardDate = (field, value, id) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id
                    ? { ...card, [field]: value }
                    : card
            )
        );
    };

    const items = [
        { label: 'About', icon: 'pi pi-info-circle' },
        { label: 'Contact', icon: 'pi pi-envelope' }
    ];

    const start = <img alt="logo" src={Ease_Logo} height="40" />;
    const end = <Button label="Sign Up" icon="pi pi-user" className="p-button-rounded" />;

    const tabItems = [
        { label: 'All Tasks', icon: 'pi pi-list' },
        { label: 'Not Started', icon: 'pi pi-clock' },
        { label: 'In Progress', icon: 'pi pi-spinner' },
        { label: 'Completed', icon: 'pi pi-check' }
    ];

    const notStartedTasks = cards.filter(card => card.status === 'Not Started');
    const inProgressTasks = cards.filter(card => card.status === 'In Progress');
    const completedTasks = cards.filter(card => card.status === 'Completed');

    const allTasks = [...notStartedTasks, ...inProgressTasks, ...completedTasks];

    return (
        <div className="App">
            <Menubar model={items} start={start} end={end} />

            <div className="hero" style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to EASE</h1>
                <p>Ease the weight of tasks off your shoulders</p>
            </div>

            <TabMenu
                model={tabItems}
                activeIndex={tabItems.findIndex(item => item.label === activeTab)}
                onTabChange={(e) => setActiveTab(e.value.label)}
                style={{ marginTop: '20px', maxWidth: '950px', margin: '0 auto' }}
            />

            <div style={{ margin: '20px 0', textAlign: 'center' }}>
                <h2>Wellness Dailys</h2>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {dailyChallenges.map((challenge) => (
                        <div key={challenge.id} style={{ margin: '10px' }}>
                            <DailyCard
                                card={challenge}
                                onMarkComplete={() => toggleDailyChallengeCompleted(challenge.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ 
    width: '100%', 
    maxWidth: '950px',  // Same maxWidth as TabMenu
    borderTop: '1px solid #ccc',  // Style for the divider line
    margin: '20px auto'  // Center it
}} />

            {/* New header for your tasks */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <h2>Your Tasks</h2>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {activeTab === 'All Tasks' ? (
                    allTasks.length > 0 ? (
                        allTasks.map((card) => (
                            <div key={card.id} style={{ margin: '10px' }}>
                                <Card
                                    card={card}
                                    weight={card.weight}
                                    onEditToggle={() => toggleEdit(card.id)}
                                    onSave={() => saveCard(card.id)}
                                    onCancel={() => toggleEdit(card.id)}
                                    onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                    onDateChange={updateCardDate}
                                    onMarkComplete={() => toggleCompleted(card.id)}
                                    onStatusChange={changeCardStatus}
                                    onRemove={() => removeCard(card.id)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No tasks available.</p>
                    )
                ) : activeTab === 'Not Started' && notStartedTasks.length > 0 ? (
                    notStartedTasks.map((card) => (
                        <div key={card.id} style={{ margin: '10px' }}>
                            <Card
                                card={card}
                                weight={card.weight}
                                onEditToggle={() => toggleEdit(card.id)}
                                onSave={() => saveCard(card.id)}
                                onCancel={() => toggleEdit(card.id)}
                                onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                onMarkComplete={() => toggleCompleted(card.id)}
                                onStatusChange={changeCardStatus}
                                onRemove={() => removeCard(card.id)}
                            />
                        </div>
                    ))
                ) : (
                    activeTab === 'Not Started' && <p>No tasks available.</p>
                )}

                {activeTab === 'In Progress' && inProgressTasks.length > 0 ? (
                    inProgressTasks.map((card) => (
                        <div key={card.id} style={{ margin: '10px' }}>
                            <Card
                                card={card}
                                onEditToggle={() => toggleEdit(card.id)}
                                onSave={() => saveCard(card.id)}
                                onCancel={() => toggleEdit(card.id)}
                                onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                onMarkComplete={() => toggleCompleted(card.id)}
                                onStatusChange={changeCardStatus}
                                onRemove={() => removeCard(card.id)}
                            />
                        </div>
                    ))
                ) : (
                    activeTab === 'In Progress' && <p>No tasks in progress.</p>
                )}

                {activeTab === 'Completed' && completedTasks.length > 0 ? (
                    completedTasks.map((card) => (
                        <div key={card.id} style={{ margin: '10px' }}>
                            <Card
                                card={card}
                                onEditToggle={() => toggleEdit(card.id)}
                                onSave={() => saveCard(card.id)}
                                onCancel={() => toggleEdit(card.id)}
                                onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                onMarkComplete={() => toggleCompleted(card.id)}
                                onStatusChange={changeCardStatus}
                                onRemove={() => removeCard(card.id)}
                            />
                        </div>
                    ))
                ) : (
                    activeTab === 'Completed' && <p>No completed tasks yet.</p>
                )}
            </div>

            <Button
                icon="pi pi-plus"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    zIndex: 1000
                }}
                onClick={() => setDisplayDialog(true)}
            />

            <Dialog
                header="Add Task"
                visible={displayDialog}
                style={{ width: '50vw' }}
                onHide={() => setDisplayDialog(false)}
            >
                <div>
                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="description">Task Description</label>
                        <textarea
                            id="description"
                            rows="5"
                            value={newCardContent}
                            onChange={(e) => setNewCardContent(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="startDate">Start Date</label>
                        <Calendar
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.value)}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="dueDate">Due Date</label>
                        <Calendar
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <Button
                    label="Add"
                    icon="pi pi-check"
                    onClick={addCard}
                    style={{ marginTop: '20px', width: '100%' }}
                />
            </Dialog>
        </div>
    );
}
