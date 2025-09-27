export function toCreateProductDTO(body) {
    const { title, description, code, price, status, stock, category, thumbnails } = body
    if (!title || !description || !code || !price || (typeof price !== "number") || typeof status !== "boolean" || typeof stock!=="number" || (typeof price !== "number") || !category) {
        return
    }
    return { title, description, code, price, status, stock, category, thumbnails }
}

export function toUpdateProductDTO(body) {
    const result = {}
    if (body?.title) result.title = body.title
    if (body?.description) result.description = body.description
    if (body?.code) result.code = body.code
    if (typeof body?.price === "number") result.price = body.price
    if (typeof body?.status === "boolean") result.status = body.status
    if (typeof body?.stock === "number") result.stock = body.stock
    if (body?.category) result.category = body.category
    if (body?.thumbnails) result.thumbnails = body.thumbnails
    return result
}

