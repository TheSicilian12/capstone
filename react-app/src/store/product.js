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
    // console.log('----Get Single Product THUNK----')
    const response = await fetch(`/api/products/${productId}`)
    // console.log('after response: ', response)
    if (response.ok) {
        // console.log('if statement')
        const await_response = await response.json();
        dispatch(loadOne(await_response))
    }
}

// Create a Product THUNK
// Product -> Details
export const postProductTHUNK = (payload) => async (dispatch) => {
    // console.log('----Post Product----')
    const { SKU, name, price, desc, inventory, owner_id } = payload
    // console.log("thunk desc: ", desc)
    // console.log("before response")
    const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payload
        )
    })

    // console.log("after response")
    // const data = await response.json()
    // console.log("data: ", data)
    // console.log("response: ", response)
    if (response.ok) {
        const data = await response.json()
        return data
    }
}

// Edit a route by Id THUNK
export const editProductTHUNK = (payload, productId) => async (dispatch) => {
    console.log("----------------Edit Product---------------------------")
    console.log(payload)
    // const { SKU, name, price, desc, inventory, owner_id } = payload
    const response = await fetch(`/api/products/${productId}/update`, {
        method: "PUT",
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

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD: {
            // console.log("action: ", action.payload.products)
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
