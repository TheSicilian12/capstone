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
        console.log("search product thunk worked!")
        console.log("data: ", data)
        dispatch(loadSearch(data))
    } else {
        console.log("search product thunk didn't work")
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
