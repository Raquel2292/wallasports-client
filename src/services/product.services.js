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
    return service.delete(`/products/${id}`)
  }

  const updateProductService = (id, productChanges) => {
    return service.patch(`/products/${id}`, productChanges)
  }

  const getAllUserProducts = (userId) => {
    return service.get(`/products/owner/${userId}`)
  }

  const getFavorites = () => {
    return service.get(`/products/favorites`)
  }

  const addFavorite = (productId) => {
    return service.patch(`/products/add-favorites/${productId}`)
  }

  const deleteFavorite = (productId) => {
    return service.patch(`/products/delete-favorites/${productId}`)
  }

export {
    getAllProductService,
    uploadProduct,
    getProductDetailsService,
    deleteProductService,
    updateProductService,
    getAllUserProducts,
    getFavorites,
    addFavorite,
    deleteFavorite
}