import bcrypt from "bcrypt"

export function toCreateUserDTO(body) {
    const { first_name, last_name, age, password, email, role } = body
    if (!first_name || !last_name || typeof(age)!=="number" || !password || !email){
        return
    }
    const hash = bcrypt.hashSync(password, 10)
    return { first_name, last_name, age, password: hash, email, role }
}

export function toUpdateUserDTO(body){
    const result = {}
    if (body?.first_name) result.first_name = body.first_name
    if (body?.last_name) result.last_name = body.last_name
    if (body?.email) result.email = body.email
    if (typeof body?.age === "number") result.age = body.age
    return result
}