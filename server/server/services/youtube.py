from ..entities.youtube import YoutubeUpsertSchema
from ..functions.youtube import download_youtube_video
from ..repositories.youtube import upsert as youtube_upsert


async def bgt_download_youtube_video_and_register(video_id: str):
    try:
        await youtube_upsert(
            {"video_id": video_id, "download_status": "DOWNLOADING"},
        )

        video_info = download_youtube_video(video_id)
        categories = video_info.get("categories")
        info: YoutubeUpsertSchema = {
            "video_id": video_info.get("id"),
            "title": video_info.get("fulltitle"),
            "duration": video_info.get("duration"),
            "thumbnail": video_info.get("thumbnail"),
            "description": video_info.get("description"),
            "is_embedable": video_info.get("playable_in_embed"),
            "tags": video_info.get("tags"),
            "language": video_info.get("language"),
            "category": categories[0] if len(categories) > 0 else None,
            "is_public": video_info.get("availability") == "public",
            "download_status": "DOWNLOADED",
        }
        await youtube_upsert(info)
    except Exception as e:
        await youtube_upsert({"video_id": video_id, "download_status": "FAILED"})
        raise ConnectionRefusedError("Failed to download video")
