import axios from "axios";

const BaseURL = "http://127.0.0.1:5003/get-trainers";

export const getNearbyTrainers = async (zipCode) => {
    try {
        const response = await axios.get(`${BaseURL}?zip_code=${zipCode}`);
        return response.data; // Return trainer data
    } catch (error) {
        console.error("Error fetching trainers:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch trainers");
    }
};
