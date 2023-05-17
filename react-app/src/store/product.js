const LOAD = 'products/all'

const load = (data) => ({
    type: LOAD,
    payload: data
})

// Get All Products THUNK
export const getAllProductsTHUNK = () => async (dispatch) => {
    const response = await fetch('/api/products')
    if (response.ok) {
        const allProducts = await response.json();
        dispatch(load(allProducts))
    }
}

const initialState = {}

export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD: {
            // console.log("action: ", action.payload.products)
            const newState = {...action.payload.products}
            return newState
        }
        default:
            return state;
    }
}
