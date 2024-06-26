from flask import Flask, jsonify, request, g
import google.generativeai as genai
from functions.chatWithGemini import chatWithGemini
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
import mimetypes

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
        prompt_file = request.files.get('prompt_file')

        allowed_extensions = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'docx', 'doc', 'xlsx', 'xls', 'mp4', 'avi', 'mov', 'mp3', 'wav', '.csv'}
        
        # Determine the mime type of the file
        mime_type, _ = mimetypes.guess_type(prompt_file.filename)
        # Save the file if it exists
        file_path = None
        if prompt_file:
            file_path = os.path.join('uploads_temp', prompt_file.filename)
            prompt_file.save(file_path)
            prompt_file = file_path

        response_text = chatWithGemini(prompt_text, prompt_file, mime_type)
        return jsonify({"response": response_text})
    except Exception as e:
        print(f"Error occurred while chatting with Gemini:\n{e}")
        return jsonify({'errorMsg': "Something went wrong"}), 400
    # finally:
        # delete saved file if exists
        # if prompt_file and os.path.exists(file_path):
        #     os.remove(file_path)

if __name__ == '__main__':
    app.run(debug=True)




# import google.generativeai as genai
# import PIL.Image
# import os

# genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
# img = PIL.Image.open('path/to/image.png')

# model = genai.GenerativeModel(model_name="gemini-1.5-flash")
# response = model.generate_content(["What is in this photo?", img])
# print(response.text)
      

# instead of generative model, use chat