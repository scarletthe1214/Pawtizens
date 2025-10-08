import axios from "axios";

const BaseURL = "http://127.0.0.1:5003/get-trainers";

export const getNearbyTrainers = async (zipCode) => {
    try {
        const response = await axios.get(`${BaseURL}?zip_code=${zipCode}`);
        return response.data; // Return trainer data
    } catch (error) {
        console.error("Error fetching trainers:", error);
        // throw new Error(error.response?.data?.message || "Failed to fetch trainers");

        // Return mock trainer data
        const mockTrainers = [
            { name: "John Doe", specialty: "Obedience", zip_code: "94603", contact: "555-1234" },
            { name: "Jane Smith", specialty: "Agility", zip_code: "98006", contact: "555-5678" },
            { name: "Mike Johnson", specialty: "Shy Dog Training", zip_code: "94538", contact: "555-9877" },
            { name: "Olivia Petersen", specialty: "Service Dog Training", zip_code: "98004", contact: "555-9876" }
        ];

        return mockTrainers;
    }
};
