import json

from ..entities.transcription import ReplicateResponseSchema
from ..entities.youtube import YoutubeUpsertSchema
from ..functions.transcription import convert_to_base64_from_audio_file, remove_audio
from ..functions.youtube import download_youtube_video
from ..repositories.youtube import upsert as youtube_upsert
from ..services.transcription import register_transcription
from .transcription import get_transcription


async def bgt_download_youtube_video_and_register(video_id: str, user_id: str):
    try:
        await youtube_upsert(
            {
                "video_id": video_id,
                "user_id": user_id,
                "download_status": "DOWNLOADING",
            },
        )

        video_info = download_youtube_video(video_id)
        categories = video_info.get("categories")
        tags = video_info.get("tags")
        info: YoutubeUpsertSchema = {
            "video_id": video_info.get("id"),
            "title": video_info.get("fulltitle"),
            "duration": video_info.get("duration"),
            "thumbnail": video_info.get("thumbnail"),
            "description": video_info.get("description"),
            "is_embedable": video_info.get("playable_in_embed"),
            "tags": (",").join(tags) if len(tags) > 0 else None,
            "extension": video_info.get("ext"),
            "language": video_info.get("language"),
            "category": categories[0] if len(categories) > 0 else None,
            "is_public": video_info.get("availability") == "public",
            "download_status": "DOWNLOADED",
            "transcribing_status": "TRANSCRIBING",
            "user_id": user_id,
        }
        await youtube_upsert(info)
        audio_file_path = f"audios/{video_id}.{info['extension']}"
        base64_audio = convert_to_base64_from_audio_file(audio_file_path)
        print("base64 converted")

        replicate_response = get_transcription(
            base64_audio, info["title"], info["language"]
        )
        dumps = json.dumps(replicate_response)
        with open(f"audios/{video_id}.json", "w") as f:
            f.write(dumps)
        replicate_response = ReplicateResponseSchema.model_validate_json(dumps)

        res = await register_transcription(replicate_response, video_id)
        print("register_transcription", res)
        await youtube_upsert(
            {
                "video_id": video_id,
                "transcribing_status": "TRANSCRIBED",
                "num_speakers": replicate_response.num_speakers,
            }
        )

        remove_audio(audio_file_path)
        print("audio file removed")
    except Exception as e:
        print("bgt_download_youtube_video_and_register", video_id, e)
        await youtube_upsert(
            {
                "video_id": video_id,
                "download_status": "FAILED",
                "transcribing_status": "FAILED",
            }
        )
        raise ConnectionRefusedError("Failed to download video")
