import os
import json
import re
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("LLM_BASE_URL", "https://integrate.api.nvidia.com/v1").rstrip("/")
API_KEY = os.getenv("LLM_API_KEY", "ollama")
MODEL_NAME = os.getenv("LLM_MODEL", "meta/llama-3.1-70b-instruct")


def _extract_json(raw_text: str) -> dict:
    cleaned = raw_text.strip()
    fence_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", cleaned, re.DOTALL)
    if fence_match:
        cleaned = fence_match.group(1)
    else:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start != -1 and end != -1:
            cleaned = cleaned[start : end + 1]
    return json.loads(cleaned)


def enhance_event_data_with_ai(raw_data: dict) -> dict:
    system_prompt = (
        "You are an Internal Quality Assurance Cell (IQAC) academic documentation specialist "
        "at Vivekananda Global University (VGU), Jaipur. "
        "Convert raw faculty event details into formal, audit-ready institutional English "
        "for NAAC accreditation. You MUST respond ONLY with a valid JSON object matching the requested schema."
    )

    user_prompt = f"""
Transform the following raw event form data into polished, formal academic report sections.
Preserve all factual numbers, dates, venues, and SDG numbers accurately without inventing statistics.

Return ONLY a valid JSON object with these exact keys:
{{
  "refinedActivityTitle": "Formal academic title of the event",
  "refinedTypeOfActivity": "Formal activity category (e.g., Workshop, FDP, Conference, Expert Lecture)",
  "refinedDateVenueOrganizingUnit": "Formatted string combining Date, Venue, and Organizing Unit",
  "sdgListFormatted": ["SDG X: Full Official UN SDG Name"],
  "targetsAddressedFormatted": "Formal description of the specific UN SDG targets addressed",
  "objectives": [
    "Objective 1 (action-oriented academic bullet)",
    "Objective 2 (action-oriented academic bullet)",
    "Objective 3 (action-oriented academic bullet)"
  ],
  "keyActivities": [
    "Activity 1",
    "Activity 2",
    "Activity 3"
  ],
  "outcomes": [
    "Outcome 1 linked to SDG target",
    "Outcome 2 linked to SDG target"
  ]
}}

Rules:
- "objectives" must have 3 bullet points.
- "keyActivities" must have 3 to 5 bullet points.
- "outcomes" must have 2 to 3 bullet points explicitly linked to the SDG targets.

Raw Faculty Input:
{json.dumps(raw_data, indent=2)}
"""

    response = requests.post(
        f"{BASE_URL}/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": 0.3,
            "max_tokens": 1500,
        },
        timeout=90,
    )
    response.raise_for_status()

    content = response.json()["choices"][0]["message"]["content"] or "{}"
    ai_structured = _extract_json(content)

    enriched = dict(raw_data)
    enriched["aiEnhanced"] = ai_structured
    return enriched