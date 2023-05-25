import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';



import './CartModalProduct.css'
import '../UniversalCSS.css'
import DeleteItemCart from '../DeleteItemCart';


export default function CartModalProduct({item}) {


    return (
       <div>
            {/* <img src={`${item.image_url}`} /> */}
            <p>{item.name}</p>
            <p>${item.price}</p>
            <DeleteItemCart className={"button-full margin2"} itemId={item.id} />
       </div>
    )
}
