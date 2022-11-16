import service from "./config.services"

const signupService = (newUser) => {
    return service.post("/auth/signup", newUser)
}

const loginService = (userCredentials) => {
    return service.post("/auth/login", userCredentials )
}

const deleteProfile = (id) => {
    return service.delete(`/auth/${id}`)
}

const editProfile = (id, userToEdit) => {
    return service.patch(`auth/${id}`, userToEdit)
}
//esta ruta pasará el token
const verifyService = () => {
    return service.get("/auth/verify")
}

export {
    signupService,
    loginService,
    verifyService,
    deleteProfile,
    editProfile
}