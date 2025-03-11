from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Define the challenge demo video link
CHALLENGE_VIDEO_LINK = "https://www.youtube.com/watch?v=WUy9HzYX4OY"

@app.route('/get-demo-video', methods=['GET'])
def get_demo_video():
    """
    API endpoint to return the demo video link.
    """
    return jsonify({
        "success": True,
        "video_link": CHALLENGE_VIDEO_LINK
    })

if __name__ == '__main__':
    app.run(debug=True, port=5002)
