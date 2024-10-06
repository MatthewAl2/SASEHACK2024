import React, { useState, useEffect } from 'react';
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

    const [tempWeight, setTempWeight] = useState(card.weight); // Temporary weight state

    // Format date function
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString(); // Format to locale date string
    };

    // Reset tempWeight when card changes
    useEffect(() => {
        setTempWeight(card.weight);
    }, [card]);

    // Function to determine border color based on weight
    const getBorderColor = (weight) => {
        if (weight >= 1 && weight <= 4) return '#add8e6'; // Light Blue
        if (weight >= 5 && weight <= 9) return '#90ee90'; // Light Green
        if (weight >= 10 && weight <= 14) return '#ffffe0'; // Light Yellow
        if (weight >= 15 && weight <= 19) return '#ffcc99'; // Light Orange
        if (weight >= 20 && weight <= 24) return '#ff9999'; // Light Red
        if (weight === 25) return '#ff0000'; // Neon red
        return '#007bff'; // Default color if weight is outside the defined range
    };

    const borderColor = getBorderColor(tempWeight); // Get border color based on weight

    return (
        <div
            style={{
                width: '18rem',
                margin: '10px',
                border: `1px solid ${borderColor}`, // Set border color
                borderRadius: '20px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
            }}
        >
            <PrimeCard
                header={
                    <div style={{ textAlign: 'center', marginTop: '30px', padding: '0 25px' }}>
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
                            gap: '10px',
                            flexWrap: 'wrap',
                        }}
                    >
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
                                    onClick={() => {
                                        onContentChange('weight', tempWeight); // Save the temporary weight
                                        onSave();
                                    }}
                                    aria-label="Save Task"
                                    style={{ flex: 1 }}
                                />
                                <Button
                                    label="Cancel"
                                    icon="pi pi-times"
                                    onClick={() => {
                                        setTempWeight(card.weight); // Reset to original weight on cancel
                                        onCancel();
                                    }}
                                    aria-label="Cancel Edit"
                                    style={{ marginLeft: 'auto', flex: 1 }}
                                />
                            </>
                        )}
                        {!card.isEditing && (
                            <Button
                                label="Remove"
                                icon="pi pi-times"
                                onClick={onRemove}
                                className="p-button-danger"
                                aria-label="Remove Task"
                                style={{ marginLeft: 'auto' }}
                            />
                        )}
                    </div>
                }
                style={{
                    border: 'none',
                    borderRadius: '20px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ textAlign: 'center', padding: '0px', flexGrow: 1 }}>
                        {/* Display content when not editing */}
                        {!card.isEditing ? (
                            <>
                                <p className="m-0" style={{ marginBottom: '0px', marginTop: '-40px', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{card.content}</p>
                                <Dropdown
                                    options={statusOptions}
                                    value={card.status}
                                    onChange={(e) => {
                                        onStatusChange(card.id, e.value);
                                    }}
                                    placeholder="Select Status"
                                    style={{ width: '100%', marginTop: '10px' }}
                                    aria-label="Task Status"
                                />
                            </>
                        ) : (
                            // Editable content
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <textarea
                                    value={card.content}
                                    onChange={(e) => onContentChange('content', e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '100px', // Fixed height for editing
                                        textAlign: 'center',
                                        marginBottom: '40px',
                                        resize: 'none', // Prevent resizing
                                        overflowY: 'auto', // Allow vertical scrolling if needed
                                        wordWrap: 'break-word', // Ensure long words break to the next line
                                        overflowWrap: 'break-word', // Ensure long words break to the next line
                                        whiteSpace: 'normal', // Allow text wrapping
                                    }}
                                    aria-label="Task Content"
                                />
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
                        )}
                    </div>
                    {/* Display Start Date and Due Date */}
                    <div style={{ textAlign: 'center', padding: '10px' }}>
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
                                        value={tempWeight !== undefined ? tempWeight : ''} // Use temporary weight
                                        onChange={(e) => {
                                            const weightValue = e.target.value === ''
                                                ? '' // Allow empty input
                                                : Math.min(Math.max(Number(e.target.value), 1), 25);
                                            setTempWeight(weightValue); // Update temporary weight
                                        }}
                                        min="1"
                                        max="25"
                                        style={{ width: '100%' }}
                                        aria-label="Task Weight"
                                    />
                                    {(tempWeight < 1 || tempWeight > 25) && tempWeight !== undefined ? (
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
