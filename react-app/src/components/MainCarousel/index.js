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

    const [currentImage, setCurrentImage] = useState(carousel[2]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // let i = 0

    // setInterval(changeImage, 5000)


    // function changeImage() {
    //     i++
    //     let imod = i % carousel.length
    //     // setCurrentImage(carousel[imod])

    //     console.log("i: ", i)
    //     console.log("imod: ", imod)
    //     setCurrentImage(carousel[imod])
    // }

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

    return (
        <div>
            <i className="fa fa-chevron-left"></i>

            <img
                alt="Shinano cart logo"
                className="nav-logo"
                src={currentImage} />
                
            <i className="fa fa-chevron-right"></i>
        </div>
    )
}
