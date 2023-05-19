import { useHistory } from 'react-router-dom'
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSel, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import './StandardButtons.css'
import '../UniversalCSS.css'
// import StandardProductBox from '../StandardProductBox'
// import { getAllProductsTHUNK } from '../../store/product';

export default function StandardButtons({text, path}) {
    const history = useHistory();

    return(
        <button className="buttons-small" onClick={() => history.push(path)}>
            {text}
        </button>
    )
}
