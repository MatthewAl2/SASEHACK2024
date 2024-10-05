import React from 'react';
import { Card as PrimeCard } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const Card = ({ card, onEditToggle, onSave, onCancel, onContentChange, onStatusChange, onRemove }) => {
    const statusOptions = [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' }
    ];

    return (
        <div
            style={{
                width: '18rem',
                margin: '10px',
                border: '1px solid #007bff',
                borderRadius: '20px', // Adjusted border radius for round corners
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden', // Ensures content doesn't overflow and maintains rounded corners
            }}
        >           
            <PrimeCard 
                header={(
                    <div style={{ textAlign: 'center' }}>
                        {card.isEditing ? (
                            <input
                                type="text"
                                value={card.title}
                                onChange={(e) => onContentChange('title', e.target.value)}
                                style={{ width: '100%', textAlign: 'center' }}
                            />
                        ) : (
                            <h3 style={{ textAlign: 'center' }}>{card.title}</h3>
                        )}
                    </div>
                )}
                footer={(
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            {!card.isEditing && (
                                <Button label="Edit" icon="pi pi-pencil" onClick={onEditToggle} />
                            )}
                            {card.isEditing && (
                                <>
                                    <Button label="Save" icon="pi pi-check" onClick={onSave} />
                                    <Button label="Cancel" icon="pi pi-times" onClick={onCancel} style={{ marginLeft: '0.5em' }} />
                                </>
                            )}
                        </div>
                        {!card.isEditing && (
                            <Button label="Remove" icon="pi pi-times" onClick={onRemove} className="p-button-danger" />
                        )}
                    </div>
                )}
                style={{
                    border: 'none', // Remove the internal border to prevent overlap
                    borderRadius: '20px', // Ensure inner card has the same border radius
                }}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    {card.isEditing ? (
                        <textarea
                            value={card.content}
                            onChange={(e) => onContentChange('content', e.target.value)}
                            style={{ width: '100%', height: '100px', textAlign: 'center' }}
                        />
                    ) : (
                        <p className="m-0">{card.content}</p>
                    )}
                    <div style={{ marginTop: '10px' }}>
                        <Dropdown
                            options={statusOptions}
                            value={card.status}
                            onChange={(e) => {
                                onStatusChange(card.id, e.value); // Call onStatusChange with card ID and new status
                            }}
                            placeholder="Select Status"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </PrimeCard>
        </div>
    );
};

export default Card;
