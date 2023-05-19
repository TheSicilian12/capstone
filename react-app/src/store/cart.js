import normalize from "./normalizer"

const LOAD_CART = 'cart/all'
const LOAD_ONE_CART = 'carts/single'

const load = (data) => ({
    type: LOAD_CART,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE_CART,
    payload: data
})

// Get all carts THUNK
export const getAllCartsTHUNK = () => async (dispatch) => {
    console.log("----Get all carts THUNK")
    const response = await fetch('/api/carts')
    if (response.ok) {
        const await_response = await response.json();
        // console.log("await_response: ", await_response)
        const allCarts = normalize(await_response.carts)
        dispatch(load(allCarts))
    }
}


// Get a single cart by user id THUNK
export const getSingleCartTHUNK = (userId) => async (dispatch) => {
    console.log("----Get single cart THUNK")
    const response = await fetch(`/api/carts/${userId}`)
    if (response.ok) {
        const await_response = await response.json();
        // console.log("await_response: ", await_response)
        // const allCarts = normalize(await_response.carts)
        dispatch(load(await_response))
    }
}


// Get a single cart items by id THUNK
// This would be getting the items in a cart
export const getItemsSingleCartTHUNK = (cartId) => async (dispatch) => {
    console.log("----Get Items Single Cart THUNK----")
    // console.log("before response")
    const response = await fetch(`/api/carts/${cartId}/items`)
    if (response.ok) {
        const await_response = await response.json();
        console.log("await_response: ", await_response.items)
        const singleCart = normalize(await_response.items)
        dispatch(loadOne(singleCart))
    }
}


// Add an item to a cart by id
export const postItemCartTHUNK = (payload) => async (dispatch) => {
    console.log("----Add item to cart----")
    const response = await fetch("/api/carts/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payload
        )
    })
    if (response.ok) {
        const data = await response.json()
        return data
    }
}


const initialState = {}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CART: {
            const newState = { ...action.payload }
            return newState
        }
        //this mimics the product and does not reflect the cart
        case LOAD_ONE_CART: {
            const newState = { items: {...action.payload} }
            return newState
        }
        default:
            return state;
    }
}
