import React from 'react';
import { Card as PrimeCard } from 'primereact/card';
import { Button } from 'primereact/button';

const Card = ({ card, onEditToggle, onSave, onCancel, onContentChange }) => {
    return (
        <div style={{ width: '18rem', margin: '10px', border: '2px solid #007bff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
            <PrimeCard footer={(
                <>
                    {!card.isEditing ? (
                        <Button label="Edit" icon="pi pi-pencil" onClick={onEditToggle} />
                    ) : (
                        <>
                            <Button label="Save" icon="pi pi-check" onClick={onSave} />
                            <Button label="Cancel" severity="secondary" icon="pi pi-times" onClick={onCancel} style={{ marginLeft: '0.5em' }} />
                        </>
                    )}
                </>
            )} header={(
                <div style={{ textAlign: 'center' }}>
                    {card.isEditing ? (
                        <input
                            type="text"
                            value={card.title}
                            onChange={(e) => onContentChange('title', e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} // Center text in input
                        />
                    ) : (
                        <h3 style={{ textAlign: 'center' }}>{card.title}</h3> // Centered title
                    )}
                </div>
            )}>
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    {card.isEditing ? (
                        <textarea
                            value={card.content}
                            onChange={(e) => onContentChange('content', e.target.value)}
                            style={{ width: '100%', height: '100px', textAlign: 'center' }} // Center text in textarea
                        />
                    ) : (
                        <p className="m-0">{card.content}</p> // Centered content
                    )}
                </div>
            </PrimeCard>
        </div>
    );
};

export default Card;
