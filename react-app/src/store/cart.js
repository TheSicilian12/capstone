import normalize from "./normalizer"

const LOAD_CART = 'cart/all'
const LOAD_ONE_CART = 'cart/single'
const POST_CART = 'cart/post'
const DELETE_ITEM_CART = 'cart/delete/item'
const CLEAR_STATE = 'cart/clearState'

const load = (data) => ({
    type: LOAD_CART,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE_CART,
    payload: data
})

const postCart = (data) => ({
    type: POST_CART,
    payload: data
})

const clearState = () => ({
    type: CLEAR_STATE
})


// Get all carts THUNK
export const getAllCartsTHUNK = () => async (dispatch) => {
    // console.log("----Get all carts THUNK")
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
    // console.log("----Get single cart THUNK")
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
    // console.log("----Get Items Single Cart THUNK----")
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


// add an item in a cart by id
export const updateItemCartTHUNK = (payload) => async (dispatch) => {
    // console.log("----Add item to cart----")
    // console.log("-----------------------", typeof product_ids)
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
    // console.log("----Add cart----")
    const {product_ids} = payload
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
        console.log("if statment post a cart")
        const data = await response.json()

        dispatch(postCart(data))
        // console.log("post cart: ", data)

        return data
    }
}

export const deleteCartTHUNK = () => async (dispatch) => {
    const response = await fetch(`/api/carts/delete`, {
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

// Delete all items by id from a specific cart
// DON'T GET THIS MIXED UP
export const deleteSpecItemSpecCartTHUNK = (productId) => async (dispatch) => {
    console.log("----Delete spec item from spec----")
    // console.log("before response")
    const response = await fetch(`/api/carts/${productId}/spec-item-cart`, {
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



// Delete all items by id form all carts
// DON'T GET THIS MIXED UP
export const deleteAllItemsCartTHUNK = (productId) => async (dispatch) => {
    console.log("----Delete item cart THUNK----")
    console.log("productId: ", productId)
    // console.log("before response")
    const response = await fetch(`/api/carts/${productId}/spec-items`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    // console.log("after response")
    if (response.ok) {
        return "Sucess"
    }
    else {
        return ["Failure"]
    }
}

// Clear cart state
export const clearCartState = () => async (dispatch) => {
    dispatch(clearState())

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
        case POST_CART: {
            console.log("post cart reducer")
            const newState = { ...action.payload }
            return newState
        }
        case DELETE_ITEM_CART: {
            const newState = { ...state }
            // console.log("newState: ", newState)
            delete newState["items"][action.payload]
            // console.log("newState: ", newState)
            return { ...newState }
        }
        case CLEAR_STATE: {
            console.log("clear cart state reducer")
            const newState = { "cart": "No cart"}
            return { ...newState }
        }
        default:
            return state;
    }
}
