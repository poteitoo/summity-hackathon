from typing import List

from google.cloud import translate


def translate_text(
    texts: List[str],
    source_language_code: str = "en-US",
    target_language_code: str = "ja",
    location="global",
):
    client = translate.TranslationServiceClient()
    parent = f"projects/summity/locations/{location}"

    response = client.translate_text(
        request={
            "parent": parent,
            "contents": texts,
            "mime_type": "text/plain",
            "source_language_code": source_language_code,
            "target_language_code": target_language_code,
        }
    )

    return response.translations
