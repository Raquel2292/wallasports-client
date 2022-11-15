import service from "./config.services"

const getAllProductService = (type) => {
    return service.get(`/products/list/${type}`)
  }

const uploadProduct = (newProduct) => {
    return service.post("/products/upload", newProduct )
}

const getProductDetailsService = (id) => {
    return service.get(`/products/detail/${id}`)
  }
  
  const deleteProductService = (id) => {
    return service.delete(`/product/${id}`)
  }

  const updateProductService = (id, productChanges) => {
    return service.patch(`/todos/${id}`, productChanges)
  }

export {
    getAllProductService,
    uploadProduct,
    getProductDetailsService,
    deleteProductService,
    updateProductService
}