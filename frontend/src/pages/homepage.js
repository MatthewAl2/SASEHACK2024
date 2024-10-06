import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import Card from '../components/card';
import { Dialog } from 'primereact/dialog';
import Navbar from '../components/navbar';
import { Calendar } from 'primereact/calendar';
import DailyCard from '../components/dailycard'; // Import the DailyCard component
import '../styles/home.css'; // Import the CSS file for styles
import { userGlobalID } from '../pages/loginPage';
import axios from 'axios';
import { ProgressBar } from 'primereact/progressbar';

export default function Home() {
    const initialCards = [];
    const initialDailyChallenges = [
        { id: 1, title: "Drink 2 liters of water", content: "Stay hydrated!", completed: false },
        { id: 2, title: "30 minutes of exercise", content: "Get moving!", completed: false },
        { id: 2, title: "Meal prep", content: "Cook something!", completed: false },

        // Add more daily challenges as needed
    ];

    // User information
    const [data, setData] = useState([]);
    console.log(userGlobalID);

    useEffect(() => {
        // Declare an async function inside useEffect
        const fetchData = async () => {
            try {
                // Await the axios.get call
                const response = await axios.get('http://127.0.0.1:5000/users/' + userGlobalID);
                // Update state with the response data
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [userGlobalID]); // Dependency array includes userGlobalID if it changes

    const formatDate = (date) =>{
        const dateObj = new Date(date);

        // Get the components of the date
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
        const day = String(dateObj.getDate()).padStart(2, '0');

        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const formatState = (state) =>{
        const statusMapping = {
            'Not Started': 0,
            'In Progress': 1,
            'Completed': 2
        };
        
        // Example usage:
      
        return statusMapping[state];
    }
    

    const postTaskData = async (newCardTitle, newCardContent, startdateObj, enddateObj) => {
        try {
            // Make the POST request using axios
            const response = await axios.post('http://127.0.0.1:5000/users/' + userGlobalID + '/tasks', {
                name: newCardTitle,
                weight: 0,
                description: newCardContent,
                state: 0,
                start_date: startdateObj,
                end_date: enddateObj,
                tags: [],
                daily_task: 0,
                user_id: userGlobalID
            });
    
            // Return the response data
            return response.data.id;
        } catch (error) {
            console.error('Error making POST request:', error);
            return null;  // Return null or handle the error appropriately
        }
    };

   
    const putTaskData = async (card) => {
        
        try {
            // Make the POST request using axios
            const taskId = await card.id
            const response = await axios.put('http://127.0.0.1:5000/tasks/' + taskId, {
                name: card.title,
                weight: 0,
                description: card.content,
                state: formatState(card.state),
                start_date: formatDate(card.startDate),
                end_date: formatDate(card.dueDate),
                tags: [],
            });
    
                // Return the response data
                return response.data.id;
            } catch (error) {
                console.error('Error making POST request:', error);
                return null;  // Return null or handle the error appropriately
            }
    };

    const deleteData = async (card) => {
        
        try {
            // Make the POST request using axios
            const id = await card.id
            const response = await axios.delete('http://127.0.0.1:5000/tasks/' + id, {
                
            });
    
                return response.data;
            } catch (error) {
                console.error('Error making POST request:', error);
                return null;  // Return null or handle the error appropriately
            }
    };


    const userXP = data[0]?.xp !== undefined ? data[0].xp : 0;
    const userLevel = data[0]?.level !== undefined ? data[0].level : 0;

    const totalXPBar = () => {    
        // Equation using level
        const totalXP = 200 / (1 + Math.E ** (-0.025 * (userLevel - 150)));
        
        return totalXP;  // Make sure the function returns the calculated value
    };
    const userLoggedIn = () => {
        if (userGlobalID === -1) {
            return false;
        } 
        else {
            return true
        }
    }




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

    const saveCard = (card) => {
        toggleEdit(card);
        putTaskData(card, card.id)
        
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
        console.log(id)
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id
                    ? { ...card, status: newStatus}
                    : card     
 
            )
        );
    };

    

    const addCard = () => {
        if (newCardTitle && newCardContent) {
            const startdateObj = formatDate(startDate);

            const enddateObj = formatDate(dueDate);
            const taskId = postTaskData(newCardTitle, newCardContent, startdateObj, enddateObj)
            
            const newCard = {
                id: taskId,
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

    const removeCard = (card) => {
        const comp = card.id
        setCards((prevCards) => prevCards.filter((card) => card.id !== comp));
        deleteData(card)
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
            <Navbar userLoggedIn={userLoggedIn}/>
        <div className="App home-background">

            <div className="hero" style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to EASE</h1>
                <p>Ease the weight of tasks off your shoulders</p>
            </div>
            <div style={{ maxWidth: '950px', margin: '20px auto', textAlign: 'center' }}>
                <h2>Level {userLevel}</h2>
                <ProgressBar value={userXP} displayValueTemplate={totalXPBar} color='green'></ProgressBar>
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
                                    onSave={() => saveCard(card)}
                                    onCancel={() => toggleEdit(card.id)}
                                    onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                    onDateChange={updateCardDate}
                                    onMarkComplete={() => toggleCompleted(card.id)}
                                    onStatusChange={changeCardStatus}
                                    onRemove={() => removeCard(card)}
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
                                onEditToggle={() => toggleEdit( )}
                                onSave={() => saveCard(card)}
                                onCancel={() => toggleEdit(card.id)}
                                onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                onMarkComplete={() => toggleCompleted(card.id)}
                                onStatusChange={changeCardStatus}
                                onRemove={() => removeCard(card)}
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
                                onSave={() => saveCard(card)}
                                onCancel={() => toggleEdit(card.id)}
                                onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                onMarkComplete={() => toggleCompleted(card.id)}
                                onStatusChange={changeCardStatus}
                                onRemove={() => removeCard(card)}
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
                                onSave={() => saveCard(card)}
                                onCancel={() => toggleEdit(card.id)}
                                onContentChange={(field, value) => updateCardContent(card.id, field, value)}
                                onMarkComplete={() => toggleCompleted(card.id)}
                                onStatusChange={changeCardStatus}
                                onRemove={() => removeCard(card)}
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
        </div>
    );
}
