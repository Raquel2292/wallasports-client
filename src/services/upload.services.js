import service from "./config.services";

const uploadImageService = (imageFile) => {
    return service.post("/upload", imageFile)
}

const uploadProductImage = (productImage) => {
    return service.post("/upload/productImage", productImage)
}

export {

    uploadImageService,
    uploadProductImage
}
