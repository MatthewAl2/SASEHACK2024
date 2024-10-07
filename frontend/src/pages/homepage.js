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

// Global variable to store the user ID
let globalID = userGlobalID;
export default function Home() {
    const initialCards = [];
    const initialDailyChallenges = [
        { id: 1, title: "Drink 2 liters of water", content: "Stay hydrated!", completed: false },
        { id: 2, title: "30 minutes of exercise", content: "Get moving!", completed: false },
        { id: 3, title: "Meal prep", content: "Cook something!", completed: false },

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

    // Function to format the date for backend
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

    // Fucntion to format date for frontend
    function formatDateFrontend(formattedDate) {
        // Split the formatted date into date and time components
        const [datePart, timePart] = formattedDate.split(' ');
    
        // Further split the date and time components
        const [year, month, day] = datePart.split('-');
        const [hours, minutes, seconds] = timePart.split(':');
    
        // Create a new Date object using the components
        // Note: Month is zero-indexed in JavaScript Date
        const dateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    
        // Return the ISO 8601 string
        return dateObj.toISOString();
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
    
    // Make a task
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
            return response.data;
        } catch (error) {
            console.error('Error making POST request:', error);
            return null;  // Return null or handle the error appropriately
        }
    };

    // Update a task
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


    // Delete a task
    const deleteData = async (card) => {
        
        try {
            // Make the POST request using axios
            const ids = await card.id
            const response = await axios.delete('http://127.0.0.1:5000/tasks/' + ids, {
                
            });
    
                return response.data;
            } catch (error) {
                console.error('Error making POST request:', error);
                return null;  // Return null or handle the error appropriately
            }
    };

    
    var userXP = data[0]?.xp !== undefined ? data[0].xp : 0;
    var userLevel = data[0]?.level !== undefined ? data[0].level : 0;
    var totalXPBar = Math.round(200 / (1 + Math.E ** (-0.025 * (userLevel - 1))));
    var progressBarVal = Math.round((userXP / totalXPBar) * 100);


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

        globalID = data[0]?.id; // Update the global user ID

        data[0]?.tasks?.forEach(task => {
            const newCard = {
                id: task.id,
                title: task.name,
                content: task.description,
                isEditing: false,
                completed: false,
                status: formatState(task.state),
                startDate: formatDate(task.start_date),
                dueDate: formatDateFrontend(task.end_date),
            };
            setCards([...cards, newCard]);
        });
        

        localStorage.setItem('cards', JSON.stringify(cards));
        


    }, [cards, data]);


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


    const putUserData = async () => {
        userXP += 10;
        if (userXP >= totalXPBar) {
            userLevel += 1;
            userXP = userXP - totalXPBar;
        }
         await axios.put('http://127.0.0.1:5000/users/' + globalID, {
            username: data[0].username,
            level: userLevel,
            xp: userXP,
            tags: data[0].tags,
            pomodoro: data[0].pomodoro,
          }
        )      

    };

    const changeCurrentStatus = (id, newStatus) => {
        changeCardStatus(id, newStatus);
        if (newStatus === 'Completed') {   
            putUserData();
        }
    };
    

    const  addCard = async () => {
        if (newCardTitle && newCardContent) {
            const startdateObj = formatDate(startDate);

            const enddateObj = formatDate(dueDate);
            const task = await postTaskData(newCardTitle, newCardContent, startdateObj, enddateObj)
            
            const newCard = {
                id: task.id,
                weight: task.weight,
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
            <Navbar userLoggedIn={globalID}/>
        <div className="App home-background">

            <div className="hero" style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to EASE</h1>
                <p>Ease the weight of tasks off your shoulders</p>
            </div>
            <div style={{ maxWidth: '950px', margin: '20px auto', textAlign: 'center' }}>
                <h2>Level {userLevel}</h2>
                <ProgressBar value={progressBarVal}></ProgressBar>

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
                                    onStatusChange={changeCurrentStatus}
                                    onRemove={() => removeCard(card)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>You are loved.</p>
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
                                onStatusChange={changeCurrentStatus}
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
                                onStatusChange={changeCurrentStatus}
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
                                onStatusChange={changeCurrentStatus}
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
