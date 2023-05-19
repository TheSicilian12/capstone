import normalize from "./normalizer"

const LOAD = 'products/all'

const load = (data) => ({
    type: LOAD,
    payload: data
})

// Get all carts
export const getAllCartsTHUNK = () => async (dispatch) => {
    const response = await fetch('/api/carts')
    if (response.ok) {
        const await_response = await response.json();
        // console.log("await_response: ", await_response)
        const allCarts = normalize(await_response.carts)
        dispatch(load(allCarts))
    }
}


const initialState = {}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD: {
            const newState = { ...action.payload }
            return newState
        }
        default:
            return state;
    }
}
