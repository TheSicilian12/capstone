import normalize from "./normalizer"

const LOAD_SEARCH_PRODUCT = 'products/search'

const loadSearch = (data) => ({
    type: LOAD_SEARCH_PRODUCT,
    payload: data
})

// Get all products from search
export const searchTHUNK = (searchData) => async (dispatch) => {
    const response = await fetch(`/api/search/${searchData}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(loadSearch(data))
    } else {
        dispatch(loadSearch("no matches"))
    }
}

const initialState = {}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SEARCH_PRODUCT: {
            const newState = { ...action.payload }
            return newState
        }
        default:
            return state;
    }
}
