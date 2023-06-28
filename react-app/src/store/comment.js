import normalize from "./normalizer"

const LOAD_COMMENTS = 'comments/all-product'

const load = (data) => ({
    type: LOAD_COMMENTS,
    payload: data
})


// Get all comments for a product THUNK
export const getAllProductCommentsTHUNK = (productId) => async (dispatch) => {
    const response = await fetch(`/api/comments/product/${productId}`)
    if (response.ok) {
        const await_response = await response.json();
        // console.log("await_response: ", await_response)
        dispatch(load(await_response))
    }
}

// Add a comment to a product THUNK
export const addProductCommentTHUNK = (commentDetails) => async (dispatch) => {
    // Need details, rating, user_id, product_id
    console.log("---add product comment THUNK----")
    const {details, rating, userId, productId} = commentDetails;

    const payloadComment = {
        details,
        rating,
        user_id: userId,
        product_ids: productId
    }
    const response = await fetch(`/api/comments/product/${productId}/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payloadComment
        )
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllProductCommentsTHUNK(productId))
    }
}

// Update a comment for a product THUNK
export const editProductCommentTHUNK = (commentDetails) => async (dispatch) => {
    const {details, rating, userId, productId, commentId} = commentDetails;
    console.log("-------------------productId: ", productId)
    console.log("-------------------commentId: ", commentId)
    const payloadComment = {
        details,
        rating,
        user_id: userId,
        product_ids: productId
    }
    const response = await fetch(`/api/comments/${commentId}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payloadComment
        )
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllProductCommentsTHUNK(productId))
    }
}

const initialState = {}

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_COMMENTS: {
            // console.log("action: ", action.payload.products)
            const newState = { ...action.payload }
            return newState
        }
        // case LOAD_ONE_PRODUCT: {
        //     const newState = { ...action.payload }
        //     return newState
        // }
        default:
            return state;
    }
}
