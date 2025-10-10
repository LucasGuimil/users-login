import bcrypt from "bcrypt"

export function toShowInfoDTO(user,param){
    const result = {}
    if(param == "/current") {
        result.name = `${user.first_name} ${user.last_name}`
        result.role = user.role
    }
    if(param == "/me"){
        result.email = user.email
        result.first_name = user.first_name
        result.last_name = user.last_name
        result.age = user.age
        result.id = user._id
        result.cart = user.cart
    }
    return result
}

export function toUpdateMeDTO(body){
    const result = {}
    if (body?.first_name) result.first_name = body.first_name
    if (body?.last_name) result.last_name = body.last_name
    if (body?.email) result.email = body.email
    if (typeof body?.age === "number") result.age = body.age
    if (body?.password) {
        const hash = bcrypt.hashSync(body.password, 10)    
        result.password = hash
    }
    return result
}