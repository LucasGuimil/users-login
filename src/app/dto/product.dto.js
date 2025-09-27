export function toCreateProductDTO(body) {
    const { title, description, code, price, status, stock, category, thumbnails } = body
    if (!title || !description || !code || !price || (typeof price !== "number") || typeof status!=="boolean" || !stock || (typeof price !== "number") || !category ) {
        return 
    }
    return { title, description, code, price, status, stock, category, thumbnails }
}