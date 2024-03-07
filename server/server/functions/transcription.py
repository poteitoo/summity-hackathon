import base64
import os


def convert_to_base64_from_audio_file(path: str):
    with open(path, "rb") as file:
        audio_bytes = file.read()
    return base64.b64encode(audio_bytes).decode("utf-8")


def remove_audio(path: str):
    os.remove(path)
