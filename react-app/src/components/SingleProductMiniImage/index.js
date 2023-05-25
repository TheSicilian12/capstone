import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



import './SingleProductMiniImage.css'
import '../UniversalCSS.css'


export default function SingleProductMiniImage({className, imageUrl}) {


    return (
        <img className={`${className}`}
            src={`${imageUrl}`}
            />
    )
}
