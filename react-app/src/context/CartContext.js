import { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleCartTHUNK } from "../store/cart";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
    const [totalItems, setTotalItems] = useState(0)
    const dispatch = useDispatch()
    // const user = useSelector(state => state.session.user)
    // console.log(user)
    const cartItems = useSelector(state => state.cart.carts?.items)

    console.log("cart items: ", cartItems)

    useEffect(() => {
       console.log("test use effect")
       dispatch(getSingleCartTHUNK())
    }, [])

    if (!cartItems) return (<div>loading</div>)

    let numberItems = Object.keys(cartItems).length
    console.log("number of items: ", numberItems)

    return (
        <CartContext.Provider value={{totalItems, setTotalItems}}>
            { children }
        </CartContext.Provider>
    );
}
