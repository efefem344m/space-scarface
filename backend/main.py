import os
import fal_client
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

FAL_KEY = os.environ.get("FAL_KEY", "")


class GenerateRequest(BaseModel):
    prompt: str
    duration: str = "5"
    ratio: str = "16:9"
    style: str = "cinematic"
    topic: str = ""
    cta: str = ""


class GenerateResponse(BaseModel):
    video_url: str
    status: str = "ready"


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate", response_model=GenerateResponse)
async def generate_video(req: GenerateRequest):
    if not FAL_KEY:
        raise HTTPException(status_code=500, detail="FAL_KEY not configured")

    full_prompt = req.prompt
    if req.topic:
        full_prompt = f"{req.topic}. {full_prompt}"
    if req.style == "cinematic":
        full_prompt += ", cinematic style, high quality"
    elif req.style == "animated":
        full_prompt += ", animated style, colorful"
    elif req.style == "news":
        full_prompt += ", news broadcast style, professional"

    aspect_ratio_map = {
        "16:9": "16:9",
        "9:16": "9:16",
        "1:1": "1:1",
    }
    aspect_ratio = aspect_ratio_map.get(req.ratio, "16:9")

    duration_map = {"15": "5", "30": "5", "60": "10", "90": "10"}
    duration = duration_map.get(req.duration, "5")

    try:
        result = fal_client.run(
            "fal-ai/kling-video/v1.6/standard/text-to-video",
            arguments={
                "prompt": full_prompt,
                "duration": duration,
                "aspect_ratio": aspect_ratio,
            },
        )
        video_url = result["video"]["url"]
        return GenerateResponse(video_url=video_url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
