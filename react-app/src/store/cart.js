import normalize from "./normalizer"

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
export const getSingleCartTHUNK = (cartId) => async (dispatch) => {
    const response = await fetch(`/api/carts/test/${cartId}`)
    if (response.ok) {
        const await_response = await response.json();
        dispatch(loadOne(await_response))
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
            const newState = { ...action.payload }
            return newState
        }
        default:
            return state;
    }
}
