// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSel, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import './StandardButtons.css'
import '../UniversalCSS.css'
// import StandardProductBox from '../StandardProductBox'
// import { getAllProductsTHUNK } from '../../store/product';

export default function StandardButtons({text}) {

    return(
        <button className="buttons-small">
            {text}
        </button>
    )


}
