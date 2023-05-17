const normalize = (data) => {
    let newObj = {}
    data.forEach(item => {
        newObj[item.id] = item
    })
    return newObj
}

export default normalize
