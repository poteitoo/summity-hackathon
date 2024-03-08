import replicate

from ..entities.transcription import ReplicateResponseSchema
from ..libs.prisma_client import prisma


def get_transcription(base64_audio: str, title: str, language: str):
    output = replicate.run(
        "thomasmol/whisper-diarization:3ff22700b10e9c888e72235131e10c0a8427cd79e750bc42e4c035be2121796b",
        input={
            "file_string": base64_audio,
            "prompt": f"you are transcribing youtube video. title:{title}",
            "group_segments": False,
            "offset_seconds": 0,
            "language": language,
            "transcript_output_format": "segments_only",
        },
    )
    return output


async def register_transcription(
    transcriptions: ReplicateResponseSchema,
    video_id: str,
):
    output = await prisma.transcription_segment.create_many(
        data=[
            {
                "end": str(segment.end),
                "start": str(segment.start),
                "text": segment.text,
                "speaker": segment.speaker,
                "index": segment_index,
                "video_id": video_id,
            }
            for segment_index, segment in enumerate(transcriptions.segments)
        ],
        skip_duplicates=True,
    )
    return output
