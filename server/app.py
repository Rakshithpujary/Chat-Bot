from flask import Flask, jsonify, request, g
import google.generativeai as genai
from functions.handleChat import handleImage, callGemini
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()  # Loads the variables from the .env file
gemini_api_key = os.getenv('GEMINI_API_KEY1')

# Initialize the Generative AI model and chat session globally
genai.configure(api_key=gemini_api_key)

model = genai.GenerativeModel(model_name="gemini-1.5-flash")
chat = model.start_chat(history=[])

@app.before_request
def before_request():
    g.chat = chat

@app.route('/api/chat-gemini', methods=['POST'])
def chatGemini():
    try:
        prompt_text = request.form.get('prompt_text')
        prompt_img = request.files.get('prompt_img')

        allowed_extensions = {'png', 'jpg', 'jpeg'}

        file_path = "dummy_path"
        if prompt_img:
            filename = prompt_img.filename
            # Check if proper image extension
            if '.' not in filename or filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
                return jsonify({'errorMsg': 'I am sorry, i dont support this file extension.'}), 400

            # retreive image in proper format so that gemini can handle
            prompt_img, file_path = handleImage(prompt_img)

        # Call Gemini
        response_text = callGemini(prompt_text, prompt_img)
        return jsonify({"response": response_text})
    except Exception as e:
        print(f"Error occurred while chatting with Gemini:\n{e}")
        return jsonify({'errorMsg': "Something went wrong, Please Try again!"}), 400
    finally:
        # delete saved file if exists
        if prompt_img and os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True)