import service from "./config.services"

const getAllProductService = () => {
    return service.get("/products")
  }

const signupService = (newUser) => {
    return service.post("/auth/signup", newUser)
}

const loginService = (userCredentials) => {
    return service.post("/auth/login", userCredentials )
}

const uploadProduct = (newProduct) => {
    return service.post("/products/upload", newProduct )
}

const getProductDetailsService = (id) => {
    return service.get(`/product/${id}`)
  }
  
  const deleteProductService = (id) => {
    return service.delete(`/product/${id}`)
  }

  const updateProductService = (id, productChanges) => {
    return service.patch(`/todos/${id}`, productChanges)
  }

//esta ruta pasará el token
const verifyService = () => {
    return service.get("/auth/verify")
}

export {
    getAllProductService,
    signupService,
    loginService,
    verifyService,
    uploadProduct,
    getProductDetailsService,
    deleteProductService,
    updateProductService
}