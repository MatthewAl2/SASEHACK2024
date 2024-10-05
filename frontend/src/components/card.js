import React from 'react';
import { Card as PrimeCard } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const Card = ({
    card,
    onEditToggle,
    onSave,
    onCancel,
    onContentChange,
    onStatusChange,
    onRemove,
}) => {
    const statusOptions = [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
    ];

    // Format date function
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString(); // Format to locale date string
    };

    return (
        <div
            style={{
                width: '18rem',
                margin: '10px',
                border: '1px solid #007bff',
                borderRadius: '20px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
            }}
        >
            <PrimeCard
                header={
                    <div style={{ textAlign: 'center' }}>
                        {card.isEditing ? (
                            <input
                                type="text"
                                value={card.title}
                                onChange={(e) => onContentChange('title', e.target.value)}
                                style={{ width: '100%', textAlign: 'center' }}
                                aria-label="Task Title"
                            />
                        ) : (
                            <h3 style={{ textAlign: 'center' }}>{card.title}</h3>
                        )}
                    </div>
                }
                footer={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            {!card.isEditing ? (
                                <Button
                                    label="Edit"
                                    icon="pi pi-pencil"
                                    onClick={onEditToggle}
                                    aria-label="Edit Task"
                                />
                            ) : (
                                <>
                                    <Button
                                        label="Save"
                                        icon="pi pi-check"
                                        onClick={onSave}
                                        aria-label="Save Task"
                                    />
                                    <Button
                                        label="Cancel"
                                        icon="pi pi-times"
                                        onClick={onCancel}
                                        style={{ marginLeft: '0.5em' }}
                                        aria-label="Cancel Edit"
                                    />
                                </>
                            )}
                        </div>
                        {!card.isEditing && (
                            <Button
                                label="Remove"
                                icon="pi pi-times"
                                onClick={onRemove}
                                className="p-button-danger"
                                aria-label="Remove Task"
                            />
                        )}
                    </div>
                }
                style={{
                    border: 'none',
                    borderRadius: '20px',
                }}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    {card.isEditing ? (
                        <textarea
                            value={card.content}
                            onChange={(e) => onContentChange('content', e.target.value)}
                            style={{ width: '100%', height: '100px', textAlign: 'center' }}
                            aria-label="Task Content"
                        />
                    ) : (
                        <p className="m-0">{card.content}</p>
                    )}
                    <div style={{ marginTop: '10px' }}>
                        <Dropdown
                            options={statusOptions}
                            value={card.status}
                            onChange={(e) => {
                                onStatusChange(card.id, e.value);
                            }}
                            placeholder="Select Status"
                            style={{ width: '100%' }}
                            aria-label="Task Status"
                        />
                    </div>
                    {/* Display Start Date and Due Date */}
                    <div style={{ marginTop: '10px' }}>
                        {card.isEditing ? (
                            <>
                                <div>
                                    <label>Start Date:</label>
                                    <Calendar
                                        value={card.startDate}
                                        onChange={(e) => onContentChange('startDate', e.value)}
                                        showIcon
                                        aria-label="Start Date"
                                    />
                                </div>
                                <div>
                                    <label>Due Date:</label>
                                    <Calendar
                                        value={card.dueDate}
                                        onChange={(e) => onContentChange('dueDate', e.value)}
                                        showIcon
                                        aria-label="Due Date"
                                    />
                                </div>
                                {/* Editable Task Weight */}
                                <div style={{ marginTop: '10px' }}>
                                    <label>Task Weight:</label>
                                    <input
                                        type="number"
                                        value={card.weight}
                                        onChange={(e) => {
                                            const weightValue = Math.min(Math.max(Number(e.target.value), 1), 25); // Ensure within bounds
                                            onContentChange('weight', weightValue);
                                        }}
                                        min="1" // Set a minimum value
                                        max="25" // Set a maximum value
                                        style={{ width: '100%' }}
                                        aria-label="Task Weight"
                                    />
                                    {card.weight < 1 || card.weight > 25 ? (
                                        <span style={{ color: 'red', fontSize: '0.8em' }}>
                                            Weight must be between 1 and 25.
                                        </span>
                                    ) : null}
                                </div>
                            </>
                        ) : (
                            <>
                                <p><strong>Start Date:</strong> {formatDate(card.startDate)}</p>
                                <p><strong>Due Date:</strong> {formatDate(card.dueDate)}</p>
                            </>
                        )}
                    </div>
                </div>
            </PrimeCard>
        </div>
    );
};

export default Card;
