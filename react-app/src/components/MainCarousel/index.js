import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './MainCarousel.css';
import '../UniversalCSS.css'

import mainCarousel1 from '../assets/Images/homepagePromo/mainCarousel1.jpg';
import mainCarousel2 from '../assets/Images/homepagePromo/mainCarousel2.jpg';
import mainCarousel3 from '../assets/Images/homepagePromo/mainCarousel3.jpg';


export default function MainCarousel() {
    const dispatch = useDispatch();

    const carousel = [mainCarousel1, mainCarousel2, mainCarousel3];

    const [currentImage, setCurrentImage] = useState(carousel[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [carousel.length])

    useEffect(() => {
        setCurrentImage(carousel[currentIndex]);
    }, [carousel, currentIndex])



    const goBackImage = () => {
        let minusIndex = currentIndex - 1;
        if (minusIndex < 0) minusIndex = carousel.length - 1;
        setCurrentIndex(minusIndex);
    }

    const goForwardImage = () => {
        let addIndex = currentIndex + 1;
        if (addIndex > carousel.length - 1) addIndex = 0;
        setCurrentIndex(addIndex)
    }

    return (
        <div className="mainCarousel-container">
            <div className="mainCarousel-backButton-container">
                <i className="fa fa-chevron-left fa-lg mainCarousel-backButton"
                    onClick={() => goBackImage()}
                ></i>
            </div>

            <img
                alt="Shinano cart logo"
                className="mainCarousel-image"
                src={currentImage} />

            <div className="mainCarousel-forwardButton-container">
                <i className="fa fa-chevron-right fa-lg mainCarousel-forwardButton"
                    onClick={() => goForwardImage()}
                ></i>
            </div>
        </div>
    )
}
