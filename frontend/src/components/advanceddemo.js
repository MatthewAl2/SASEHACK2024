import React, { useState, useRef } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function EditableCard() {
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    // Handle dragging start
    const onCardDragStart = (event) => {
        const element = event.target.getBoundingClientRect();
        event.dataTransfer.setData('offsetX', event.clientX - element.left);
        event.dataTransfer.setData('offsetY', event.clientY - element.top);
    };

    // Handle the card being dropped at a new location
    const onCardDrop = (event) => {
        event.preventDefault();
        const offsetX = parseInt(event.dataTransfer.getData('offsetX'), 10);
        const offsetY = parseInt(event.dataTransfer.getData('offsetY'), 10);

        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;

        // Get container and card dimensions
        const container = containerRef.current.getBoundingClientRect();
        const card = cardRef.current.getBoundingClientRect();

        // Calculate boundaries to ensure card stays within the container
        const maxX = container.width - card.width;
        const maxY = container.height - card.height;

        // Check if the card is out of bounds and snap to the nearest edge
        const clampedX = Math.min(Math.max(0, newX), maxX);
        const clampedY = Math.min(Math.max(0, newY), maxY);

        // Snap to edges if outside the container
        const snappedX = newX < 0 ? 0 : newX > maxX ? maxX : clampedX;
        const snappedY = newY < 0 ? 0 : newY > maxY ? maxY : clampedY;

        setCardPosition({ x: snappedX, y: snappedY });
    };

    // Prevent default behavior when dragging over
    const onCardDragOver = (event) => {
        event.preventDefault();
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Save the edited content
    const saveCard = () => {
        setTitle(editedTitle);
        setContent(editedContent);
        setIsEditing(false);
    };

    const footer = (
        <>
            {!isEditing ? (
                <Button label="Edit" icon="pi pi-pencil" onClick={toggleEdit} />
            ) : (
                <>
                    <Button label="Save" icon="pi pi-check" onClick={saveCard} />
                    <Button label="Cancel" severity="secondary" icon="pi pi-times" onClick={toggleEdit} style={{ marginLeft: '0.5em' }} />
                </>
            )}
        </>
    );

    return (
        <div 
            ref={containerRef} 
            className="card-container" 
            onDrop={onCardDrop} 
            onDragOver={onCardDragOver} 
            style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100vh', 
                border: '3px solid #007bff', 
                boxSizing: 'border-box', 
                padding: '10px', 
                overflow: 'hidden' 
            }}
        >
            <div
                ref={cardRef}
                draggable
                onDragStart={onCardDragStart}
                style={{ 
                    position: 'absolute', 
                    top: cardPosition.y, 
                    left: cardPosition.x 
                }}
            >
                <Card title={isEditing ? (
                        <input 
                            type="text" 
                            value={editedTitle} 
                            onChange={(e) => setEditedTitle(e.target.value)} 
                            style={{ width: '100%' }}
                        />
                    ) : title
                } 
                footer={footer} 
                style={{ width: '18rem', border: '1px solid #ccc', textAlign: 'center' }}
                >
                    <div>
                        {isEditing ? (
                            <textarea 
                                value={editedContent} 
                                onChange={(e) => setEditedContent(e.target.value)} 
                                style={{ width: '100%', height: '100px' }} 
                            />
                        ) : (
                            <p className="m-0">{content}</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
