import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
    const [totalItems, setTotalItems] = useState(0)

    return (
        <CartContext.Provider value={{totalItems, setTotalItems}}>
            { children }
        </CartContext.Provider>
    );
}
