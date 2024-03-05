from yt_dlp import YoutubeDL


def get_youtube_video_info(video_url: str):
    with YoutubeDL() as ydl:
        try:
            info = ydl.extract_info(video_url, download=False)
            return ydl.sanitize_info(info)
        except Exception as e:
            raise ValueError("Not found")


def checkIfIsAvailableVideoA(info, _, __):
    duration = info.get("duration")
    if duration is None:  # ライブストリームなどdurationがわからない場合
        raise SystemError("Video duration is unknown")
    if duration > 120 * 60:  # 120 minutes までの動画を取得可能
        raise SystemError("Video longer than 10 minutes")


ydl_opts = {
    "extract_audio": True,
    "format": "bestaudio",
    "outtmpl": "audios/%(id)s.%(ext)s",
    "match_filter": checkIfIsAvailableVideoA,
}


def download_youtube_video(video_url: str):
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=True)
        ydl.download([video_url])
        return ydl.sanitize_info(info)
