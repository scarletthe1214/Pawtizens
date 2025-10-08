import axios from "axios";

const BaseURL = "http://127.0.0.1:5002/get-demo-video";

export const getDemoVideo = async (skillName) => {
    try {
        const response = await axios.get(`${BaseURL}?skill=${encodeURIComponent(skillName)}`);
        return response.data; // Return video link data
    } catch (error) {
        console.error("Error fetching demo video:", error);
        // throw new Error(error.response?.data?.message || "Failed to fetch demo video");

        // Return mock video data
        return {
            success: true,
            video_link: "https://www.youtube.com/watch?v=WUy9HzYX4OY"
        };
    }
};
