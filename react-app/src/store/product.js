import normalize from "./normalizer"

const LOAD = 'products/all'
const LOAD_ONE = 'products/single'
const POST_PRODUCT = 'products/post'

const load = (data) => ({
    type: LOAD,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE,
    payload: data
})

const postProduct = (data) => ({
    type: POST_PRODUCT,
    payload: data
})

// Get All Products THUNK
export const getAllProductsTHUNK = () => async (dispatch) => {
    const response = await fetch('/api/products')
    if (response.ok) {
        const await_response = await response.json();
        const allProducts = normalize(await_response.products)
        dispatch(load(allProducts))
    }
}

// Get Single Product by Id THUNK
export const getSingleProductTHUNK = (productId) => async (dispatch) => {
    console.log('----Get Single Product THUNK----')
    const response = await fetch(`/api/products/${productId}`)
    console.log('after response: ', response)
    if (response.ok) {
        console.log('if statement')
        const await_response = await response.json();
        dispatch(loadOne(await_response))
    }
}

// Create a Product THUNK
export const postProductTHUNK = (payload) => async (dispatch) => {
    console.log('----Post Product----')
    const {SKU, name, price, desc, inventory} = payload
    const payloadProduct = {
        SKU,
        name,
        price
    }
    const payloadProductDetails = {
        desc
    }
    const payloadProductInventory = {
        inventory
    }
    


}


const initialState = {}

export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD: {
            // console.log("action: ", action.payload.products)
            const newState = {...action.payload}
            return newState
        }
        case LOAD_ONE: {
            const newState = {...action.payload}
            return newState
        }
        default:
            return state;
    }
}
