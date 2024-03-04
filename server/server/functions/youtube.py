from yt_dlp import YoutubeDL


def get_youtube_video_info(video_url: str):
    with YoutubeDL() as ydl:
        try:
            info = ydl.extract_info(video_url, download=False)
            return ydl.sanitize_info(info)
        except Exception as e:
            raise ValueError("Not found")


def shorter_than_one_hour(info, *, incomplete):
    """Download only videos longer than a minute (or with unknown duration)"""
    duration = info.get("duration")
    print("duration: ", duration)
    if duration and duration > 120 * 60:  # 120 minutes
        raise SystemError("Video longer than 10 minutes")


ydl_opts = {
    "extract_audio": True,
    "format": "bestaudio",
    "outtmpl": "audios/%(id)s.%(ext)s",
    "match_filter": shorter_than_one_hour,
}


def download_youtube_video(video_url: str):
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=True)
        ydl.download([video_url])
        return ydl.sanitize_info(info)
