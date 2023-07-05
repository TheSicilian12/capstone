import { deleteAllItemsCartTHUNK } from "./cart"
import normalize from "./normalizer"

const LOAD_PRODUCT = 'products/all'
const LOAD_ONE_PRODUCT = 'products/single'

const load = (data) => ({
    type: LOAD_PRODUCT,
    payload: data
})

const loadOne = (data) => ({
    type: LOAD_ONE_PRODUCT,
    payload: data
})

// Get all products THUNK
export const getAllProductsTHUNK = () => async (dispatch) => {
    // console.log("----Get all products THUNK----")
    const response = await fetch('/api/products')
    // console.log("response: ", response)
    if (response.ok) {
        const await_response = await response.json();
        // console.log("await_response: ", await_response)

        const allProducts = normalize(await_response.products)

        // console.log("allProducts: ", allProducts)
        dispatch(load(allProducts))
    }
}

// Get single product by id THUNK
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

// Create a product THUNK
// Product -> Details
export const postProductTHUNK = (payload) => async (dispatch) => {
    // console.log('----Post Product----')
    const { name, price, desc, inventory, owner_id, images } = payload
    // Post product
    // Post image associated to product
    const payloadProduct = {
        name,
        price,
        desc,
        inventory,
        owner_id
    }
    const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payloadProduct
        )
    })
    if (response.ok) {
        const data = await response.json()
        // Images are in a list of dictionaries

        for (const image of images) {
            // image.product_id = data.product.id
            // await dispatch(postImageTHUNK(image))
            // await Promise.all(
            //     images.map((image) => dispatch(postImageTHUNK(image, data.product.id)))
            // )
            await dispatch(postImageTHUNK(image, data.product.id))
        }
        return data
    }
}

// Add an image
export const postImageTHUNK = (payload, productId) => async (dispatch) => {
    // console.log("----Post image----")
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
    return response;
}

// Edit a product by id THUNK
export const editProductTHUNK = (payload, productId) => async (dispatch) => {
    // console.log("----------------Edit Product---------------------------")
    // console.log(payload)
    const { name, price, desc, inventory, owner_id, images } = payload

    const payloadProduct = {
        name,
        price,
        desc,
        inventory,
        owner_id
    }

    const response = await fetch(`/api/products/${productId}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            payloadProduct
        )
    })
    if (response.ok) {
        const data = await response.json()
        // console.log("images: ", images)
        for (const image of images) {
            // console.log("image dispatch")
            if (image) await dispatch(editImageTHUNK(image, productId))
        }
        return data
    }
}

// Edit an image by id
export const editImageTHUNK = (payloadPlus, productId) => async (dispatch) => {
    const { image_url, main_image, image_id, deleteImg } = payloadPlus
    const payload = {
        product_id: productId,
        main_image,
        image_url,
    }
    // if (image_url === "") {
    //     return "not valid"
    // }
    if (deleteImg === "delete") {
        // delete an image
        // console.log("delete route THUNK")
        await dispatch(deleteImageTHUNK(image_id))
    } else if (!image_id) {
        // add an image
        let payload = {
            main_image,
            image_url
        }
        await dispatch(postImageTHUNK(payload, productId))

    } else {
        // update an image
        const response = await fetch(`/api/images/${image_id}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                payload
            )
        })
        return response;
    }
}

// Delete an image by id
export const deleteImageTHUNK = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}`, {
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

// Delete a product by id THUNK
export const deleteProductTHUNK = (productId) => async (dispatch) => {
    // console.log("----Delete product THUNK----")
    const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        // console.log("delete product thunk ok")
        // When a product is deleted a cart needs to be updated!
        // payloadCart = {
        //     user_id: userId,
        //     product_ids: productId
        // }
        dispatch(deleteAllItemsCartTHUNK(productId))
        return "Success"
    }
    else {
        return ["Failure"]
    }
}

// Get all products from search
export const searchProductTHUNK = (searchData) => async (dispatch) => {
    const response = await fetch(`/api/search/${searchData}`)
    if (response.ok) {
        const data = await response.json()
        console.log("search product thunk worked!")
        console.log("data: ", data)
    } else {
        console.log("search product thunk didn't work")
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
