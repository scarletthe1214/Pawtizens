from flask_cors import CORS
from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trainer data from a CSV file
df = pd.read_csv('trainers.csv', dtype={'zip_code': str})  # Ensure zip_code is treated as a string

@app.route('/get-trainers', methods=['GET'])
def get_trainers():
    try: 
        zip_code = request.args.get('zip_code')

        if not zip_code:
            return jsonify({"error": "Missing zip_code parameter"}), 400

        # Ensure zip_code is treated as a string
        zip_code = str(zip_code).strip()

        # Debug: Print available ZIP codes
        print(f"Available ZIP codes in dataset: {df['zip_code'].unique()}")

        # Properly filter rows where zip_code matches
        trainers_in_zip = df.loc[df['zip_code'] == zip_code].to_dict(orient='records')

        if not trainers_in_zip:
            print(df)
            return jsonify({"message": "No trainers found for this zip code"}), 404

        return jsonify(trainers_in_zip)
    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True, port=5003)

