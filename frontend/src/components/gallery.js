import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

export default function ImageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Assuming you have an array of image paths
        const imagePaths = [
            '/images/galleria4.jpg',
            '/images/galleria5.jpg',
            '/images/galleria6.jpg',
            '/images/galleria7.jpg',
            '/images/galleria10.jpg',
            '/images/galleria11.jpg',
            '/images/galleria13.jpg',
            '/images/galleria14.jpg',
            '/images/galleria15.jpg',
        ];

        // Map the paths to the format expected by Galleria
        const formattedImages = imagePaths.map((path, index) => ({
            itemImageSrc: path,
            thumbnailImageSrc: path,
            alt: `Image ${index + 1}`
        }));

        setImages(formattedImages);
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div className="card"> 
            <Galleria value={images} numVisible={5} circular style={{ maxWidth: '640px' }} 
                showItemNavigators showItemNavigatorsOnHover showIndicators
                showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    );
}
