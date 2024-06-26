from flask import g
import textwrap
import PIL.Image
import mimetypes

def to_markdown(text):
    text = text.replace('•', '  *')
    return textwrap.indent(text, '> ', predicate=lambda _: True)

def handleFile(prompt_file):
    
    # Determine the mime type of the file
    mime_type, _ = mimetypes.guess_type(prompt_file.filename)
    # Save the file
    file_path = os.path.join('uploads_temp', prompt_file.filename)
    prompt_file.save(file_path)
    prompt_file = file_path

    if mime_type and mime_type.startswith('image'):
        prompt_file = PIL.Image.open(prompt_file)
    
    return prompt_file, file_path

def callGemini(prompt_text, prompt_file, mime_type):

    response = ""
    if prompt_file is None:
        response = g.chat.send_message(prompt_text) # if user did not send file, then send only text to gemini
    else:
        if mime_type and mime_type.startswith('image'):
            prompt_file = PIL.Image.open(prompt_file)
        else:
            pass
        
        response = g.chat.send_message([prompt_text, prompt_file])  # Send both text and file to gemini

    final_text = to_markdown(response.text)

    return final_text