export function createUser({ name, email, role }) {
    let user = {
        name,
        email
    }

    if (role === "ADMIN") {
        user.role = 'ADMIN'
    } else if (role = "NORMAL") {
        user.role = "NORMAL"
    }

    return user
}