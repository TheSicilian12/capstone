import normalize from "./normalizer"

const LOAD_PRODUCT = 'products/all'
const LOAD_ONE_PRODUCT = 'products/single'
const POST_PRODUCT = 'products/post'
const DELETE_PRODUCT = 'products/delete'

const load = (data) => ({
    type: LOAD_PRODUCT,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE_PRODUCT,
    payload: data
})

const postProduct = (data) => ({
    type: POST_PRODUCT,
    payload: data
})

// Get all products THUNK
export const getAllProductsTHUNK = () => async (dispatch) => {
    console.log("----Get all products THUNK----")
    const response = await fetch('/api/products')
    if (response.ok) {
        const await_response = await response.json();
        const allProducts = normalize(await_response.products)
        dispatch(load(allProducts))
    }
}

// Get single product by id THUNK
export const getSingleProductTHUNK = (productId) => async (dispatch) => {
    console.log('----Get Single Product THUNK----')
    const response = await fetch(`/api/products/${productId}`)
    // console.log('after response: ', response)
    if (response.ok) {
        // console.log('if statement')
        const await_response = await response.json();
        dispatch(loadOne(await_response))
    }
}

// Create a product THUNK
// Product -> Details
export const postProductTHUNK = (payload) => async (dispatch) => {
    console.log('----Post Product----')
    const { SKU, name, price, desc, inventory, owner_id, main_image, images } = payload
    // Post product
    // Post image associated to product

    const payloadProduct = {
        SKU,
        name,
        price,
        desc,
        inventory,
        owner_id
    }

    console.log("images: ", images)

    console.log("before fetch")
    const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payloadProduct
        )
    })
    console.log("after fetch")
    if (response.ok) {
        const data = await response.json()
        // // For each image a loop needs to occur to post the image.

        // Main image
        let payloadMainImage = {
            image_url: main_image,
            main_image: true
        }
        const mainData = dispatch(postImageTHUNK(payloadMainImage, data.product.id))

        if (mainData.ok) {
            //Sub images
            for (const image of images) {
                let payloadImage = {
                    image_url: image,
                    main_image: false,
                }
                dispatch(postImageTHUNK(payloadImage, data.product.id))
            }
        }

        return data
    }
}

// Add an image
export const postImageTHUNK = (payload, productId) => async (dispatch) => {
    payload.product_id = productId

    const response = await fetch("/api/images/create", {
        method: "POST",
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

// Edit a product by id THUNK
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

// Delete a product by id THUNK
export const deleteProductTHUNK = (productId) => async (dispatch) => {
    console.log("----Delete product THUNK----")
    const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        return "Success"
    }
    else {
        return ["Failure"]
    }
}

const initialState = {}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCT: {
            // console.log("action: ", action.payload.products)
            const newState = { ...action.payload }
            return newState
        }
        case LOAD_ONE_PRODUCT: {
            const newState = { ...action.payload }
            return newState
        }
        default:
            return state;
    }
}
