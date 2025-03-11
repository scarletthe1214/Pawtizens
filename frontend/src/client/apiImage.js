import axios from "axios";

const BaseURL = "http://127.0.0.1:5000/images"

export const getImage = async (filename) => {
    const response = await axios.get(`${BaseURL}/${filename}`, {
        responseType: 'blob', // Specify the response type as 'blob'
    });
    const data = response.data;
    console.log(data);
    const imageUrl = URL.createObjectURL(data);
    return imageUrl;
}