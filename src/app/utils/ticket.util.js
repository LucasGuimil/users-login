export function cartTotal(c){
    const total = c.products.reduce((acc,p)=>acc + (p.quantity*p.price),0)
    return total
}