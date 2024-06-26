from flask import g
import textwrap

def to_markdown(text):
    text = text.replace('•', '  *')
    return textwrap.indent(text, '> ', predicate=lambda _: True)

def chatWithGemini(prompt_text, prompt_img):

    response = ""
    if prompt_img is None:
        response = g.chat.send_message(prompt_text) # if user did not send image, then send only text to gemini
    else:
        response = g.chat.send_message([prompt_text, prompt_img]) # else send both to gemini

    final_text = to_markdown(response.text)

    return final_text