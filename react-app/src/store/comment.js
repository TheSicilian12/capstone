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
