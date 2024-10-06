import React from 'react';

const DailyCard = ({ card, onMarkComplete }) => {
    return (
        <div
            style={{
                backgroundColor: 'gold',
                borderRadius: '10px',
                padding: '20px',
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '150px', // Set a minimum height for the card
            }}
        >
            <div>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <p>Status: {card.completed ? 'Completed' : 'Not Completed'}</p>
                {card.startDate && <p>Start Date: {card.startDate.toLocaleDateString()}</p>}
                {card.dueDate && <p>Due Date: {card.dueDate.toLocaleDateString()}</p>}
            </div>
            <button onClick={onMarkComplete} style={{ marginTop: '10px', backgroundColor: 'orange', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
                {card.completed ? 'Undo' : 'Mark Complete'}
            </button>
        </div>
    );
};

export default DailyCard;
