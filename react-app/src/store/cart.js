import normalize from "./normalizer"
import { getSingleProductTHUNK } from "./product"

const LOAD = 'products/all'
const LOAD_ONE = 'products/single'

const load = (data) => ({
    type: LOAD,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE,
    payload: data
})

// Get all carts THUNK
export const getAllCartsTHUNK = () => async (dispatch) => {
    const response = await fetch('/api/carts')
    if (response.ok) {
        const await_response = await response.json();
        // console.log("await_response: ", await_response)
        const allCarts = normalize(await_response.carts)
        dispatch(load(allCarts))
    }
}

// Get a single cart by id THUNK
// This would be getting the items in a cart
export const getSingleCartTHUNK = (cartId) => async (dispatch) => {
    // console.log("----Get Single Cart THUNK----")
    // console.log("before response")
    const response = await fetch(`/api/carts/${cartId}`)
    // console.log("after response")
    if (response.ok) {
        // console.log("response if")
        const await_response = await response.json();
        console.log("await_response: ", await_response.items)

        // await_response.items.forEach(item =>
        //     dispatch(getSingleProductTHUNK(item.productId))
        // )

        const singleCart = normalize(await_response.items)

        dispatch(loadOne(singleCart))
    }
}

// Add an item to a cart by id
export const postItemCartTHUNK = (payload) => async (dispatch) => {
    const response = await fetch("/api/carts/add-item", {
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
        case LOAD: {
            const newState = { ...action.payload }
            return newState
        }
        case LOAD_ONE: {
            const newState = { items: {...action.payload} }
            return newState
        }
        default:
            return state;
    }
}
