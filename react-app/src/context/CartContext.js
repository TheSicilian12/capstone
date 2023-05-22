import { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemsSingleCartTHUNK } from "../store/cart";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
    const [totalItems, setTotalItems] = useState(0)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log(user)
    // const cartItems = useSelector(state => state.cart)

    // console.log("cart items: ", cartItems)

    // useEffect(() => {
    //    console.log("test use effect")
    //    dispatch(getItemsSingleCartTHUNK(1))
    // })


    return (
        <CartContext.Provider value={{totalItems, setTotalItems}}>
            { children }
        </CartContext.Provider>
    );
}
