from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def generate_training_plan(target_date):
    today = datetime.today().date()
    target_date = datetime.strptime(target_date, "%Y-%m-%d").date()
    total_days = (target_date - today).days
    
    if total_days <= 0:
        return {"error": "Target date must be in the future."}
    
    training_plan = []
    milestones = [
        "Accepting a Friendly Stranger",
        "Sitting Politely for Petting",
        "Appearance and Grooming",
        "Out for a Walk",
        "Walking through a Crowd",
        "Sit, Down and Stay",
        "Recall",
        "Reaction to Another Dog",
        "Reaction to Distractions",
        "Supervised Separation"
    ]
    
    interval = total_days // len(milestones)
    current_date = today
    
    for milestone in milestones:
        training_plan.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "task": milestone
        })
        current_date += timedelta(days=interval)
    
    return training_plan

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.get_json()
    target_date = data.get("target_date")
    
    if not target_date:
        return jsonify({"error": "Missing target_date parameter."}), 400
    
    plan = generate_training_plan(target_date)
    return jsonify({"training_plan": plan})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
