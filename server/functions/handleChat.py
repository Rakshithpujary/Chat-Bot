from flask import g
import textwrap
import os
import PIL.Image
# import mimetypes
# import fitz  # PyMuPDF

# def saveFile(prompt_file):
#     # Determine the mime type of the file
#     mime_type, _ = mimetypes.guess_type(prompt_file.filename)
#     # Save the file
#     file_path = os.path.join('uploads_temp', prompt_file.filename)
#     prompt_file.save(file_path)
#     prompt_file = file_path

#     return prompt_file, mime_type, file_path

# def handleFile(prompt_file, mime_type):

#     if mime_type and mime_type.startswith('image'):
#         prompt_file = PIL.Image.open(prompt_file)
#     elif mime_type.startswith('application/pdf'):
#         prompt_file = fitz.open(prompt_file)
#     elif mime_type.startswith('text/plain'):
#         prompt_file = open_text(prompt_file)
#     elif mime_type.startswith('audio'):
#         prompt_file = open_audio(prompt_file)
#     elif mime_type.startswith('video'):
#         prompt_file = open_video(prompt_file)
#     elif mime_type.startswith('application/vnd.openxmlformats-officedocument'):
#         prompt_file = open_docx(prompt_file)

#     return prompt_file

def to_markdown(text):
    text = text.replace('•', '  *')
    return textwrap.indent(text, '> ', predicate=lambda _: True)

def handleImage(prompt_img):
    # Save the file
    file_path = os.path.join('uploads_temp', prompt_img.filename)
    prompt_img.save(file_path)
    prompt_img = file_path

    # get it ready for gemini ( for this saving is necassary )
    prompt_img = PIL.Image.open(prompt_img)

    return prompt_img, file_path

def callGemini(prompt_text, prompt_img):

    boundary_text = (
        "Below is a prompt. Your task is to reply to the prompt. "
        "Ensure the prompt is strictly related to the study of entrance "
        "or competitive exams in India.\nPrompt: \n"
    )

    # boundary_text = " hi, "
    
    prompt_text = boundary_text + prompt_text

    response = ""
    if prompt_img is None:
        response = g.chat.send_message(prompt_text) # if user did not send img, then send only text to gemini
    else:
        response = g.chat.send_message([prompt_text, prompt_img])  # Send both text and img to gemini

    final_text = to_markdown(response.text)

    return final_text