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
        // throw error;

        // Return mock training plan data
        const mockTrainingPlan = [
            { task: "Accepting a Friendly Stranger", date: "2026-01-15" },
            { task: "Sitting Politely for Petting", date: "2026-01-22" },
            { task: "Appearance and Grooming", date: "2026-01-29" },
            { task: "Out for a Walk", date: "2026-02-05" },
            { task: "Walking through a Crowd", date: "2026-02-12" },
            { task: "Sit, Down and Stay", date: "2026-02-19" },
            { task: "Recall", date: "2026-02-26" },
            { task: "Reaction to Another Dog", date: "2026-03-05" },
            { task: "Reaction to Distractions", date: "2026-03-12" },
            { task: "Supervised Separation", date: "2026-03-19" }
        ];

        return mockTrainingPlan;
    }
};
