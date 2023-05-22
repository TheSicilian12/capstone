import normalize from "./normalizer"

const LOAD_CART = 'cart/all'
const LOAD_ONE_CART = 'carts/single'
const POST_CART = 'cart/post'
const DELETE_ITEM_CART = 'cart/delete/item'
const DELETE_CART = 'cart/delete'

const load = (data) => ({
    type: LOAD_CART,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE_CART,
    payload: data
})

const deleteItemCart = (data) => ({
    type: DELETE_ITEM_CART,
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
export const getSingleCartTHUNK = () => async (dispatch) => {
    console.log("----Get single cart THUNK")
    const response = await fetch(`/api/carts/yours`)
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
        let await_response = await response.json();
        // console.log("await_response: ", await_response.items)
        let totalPrice = 0;
        Object.values(await_response)[0].map(item => totalPrice += item.product.price)
        // console.log("Object.values: ", Object.values(await_response)[0])

        // console.log("price: ", totalPrice)
        let singleCart = {}
        singleCart.items = normalize(await_response.items)
        singleCart.totalPrice = totalPrice
        // console.log("singleCart: ", singleCart)


        dispatch(loadOne(singleCart))
    }
}


// Add an item to a cart by id
export const updateItemCartTHUNK = (payload) => async (dispatch) => {
    console.log("----Add item to cart----")
    const {user_id, product_ids, total_price} = payload
    console.log("-----------------------", typeof product_ids)
    // console.log("payload: ", payload)
    const response = await fetch("/api/carts/add-item", {
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
        console.log("data: ", data)
        dispatch(getSingleCartTHUNK())
        return data
    }
}


// Add a cart
export const postCartTHUNK = (payload) => async (dispatch) => {
    console.log("----Add cart----")
    const {user_id, total_price, product_ids} = payload
    // console.log(user_id)
    // console.log(total_price)
    console.log(product_ids)
    const response = await fetch("/api/carts/add-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payload
        )
    })
    if (response.ok) {
        console.log("if statment")
        const data = await response.json()
        return data
    }
}

export const deleteCartTHUNK = (userId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${userId}/cart`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        return "Sucess"
    }
    else {
        return ["Failure"]
    }
}


// Delete an item by id
export const deleteItemCartTHUNK = (productId) => async (dispatch) => {
    // console.log("----Delete item cart THUNK----")
    // console.log("before response")
    const response = await fetch(`/api/carts/${productId}/item`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    // console.log("after response")
    if (response.ok) {
        dispatch(getSingleCartTHUNK())
        return "Sucess"
    }
    else {
        return ["Failure"]
    }
}


const initialState = {
    totalPrice: {},
}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CART: {
            // console.log("cart: ", action.payload)
            const newState = { ...action.payload }
            return newState
        }
        //this mimics the product and does not reflect the cart
        case LOAD_ONE_CART: {
            console.log("reducer: ", action.payload)
            const newState = { ...state, items: {...action.payload.items}, totalPrice: action.payload.totalPrice  }
            return newState
        }
        case DELETE_ITEM_CART: {
            const newState = { ...state }
            console.log("newState: ", newState)
            delete newState["items"][action.payload]
            console.log("newState: ", newState)
            return { ...newState }
        }
        default:
            return state;
    }
}
