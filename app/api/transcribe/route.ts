import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "3ff22700b10e9c888e72235131e10c0a8427cd79e750bc42e4c035be2121796b",
      input: {
        file: "https://replicate.delivery/pbxt/JcL0ttZLlbchC0tL9ZtB20phzeXCSuMm0EJNdLYElgILoZci/AI%20should%20be%20open-sourced.mp3",
        prompt: "Mark and Lex talking about AI.",
        file_url: "",
        group_segments: true,
        offset_seconds: 0,
        transcript_output_format: "both",
      },
    }),
  }).then((res) => res.json());

  return NextResponse.json(response);
}
