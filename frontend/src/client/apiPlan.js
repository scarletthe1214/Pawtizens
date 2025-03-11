import axios from "axios";

const BaseURL = "http://127.0.0.1:5001/generate-plan";

export const getTrainingPlan = async (targetDate) => {
    try {
        const response = await axios.post(BaseURL, { target_date: targetDate });
        const data = response.data;
        console.log(data);
        return data.training_plan; // Return the full training plan
    } catch (error) {
        console.error("Error fetching training plan:", error);
        throw error;
    }
};
