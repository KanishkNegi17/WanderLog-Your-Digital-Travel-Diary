import axiosInstance from "./axiosInstance"

const uploadImage = async(imageFile)=>{
    const formData = new FormData()

    formData.append("image",imageFile)

    try {
        const response = await axiosInstance.post("/travel-story/image-upload", formData,{
            headers: {
                "Content-Type":"multipart/form-data"
            },
        })
    return response.data
    } catch (error) {
        console.log("Error In Uplaoding Image",error)
        throw error
    }
}

export default uploadImage