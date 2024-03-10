from typing import List, Tuple

from ..libs.prisma_client import prisma


async def create_translation_to_segments(
    texts: List[Tuple[int, str]], video_id: str
) -> int:
    return await prisma.translation.create_many(
        skip_duplicates=True,
        data=[
            {"language": "ja", "text": text, "video_id": video_id, "index": index}
            for (index, text) in texts
        ],
    )
