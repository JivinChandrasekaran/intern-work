# app/database/database.py
import httpx
from fastapi import HTTPException
from app.core.config import SUPABASE_URL, SUPABASE_HEADERS


async def supabase_request(
    method: str,
    table: str,
    data: dict = None,
    filters: str = ""
):
    """
    Central function to communicate with Supabase REST API.

    method  : GET / POST / PATCH
    table   : dispatches / returns / trackers
    data    : dict body for POST / PATCH
    filters : query string e.g. "?id=eq.some-uuid"
    """
    url = f"{SUPABASE_URL}/rest/v1/{table}{filters}"

    async with httpx.AsyncClient() as client:
        if method == "GET":
            response = await client.get(url, headers=SUPABASE_HEADERS)
        elif method == "POST":
            response = await client.post(url, headers=SUPABASE_HEADERS, json=data)
        elif method == "PATCH":
            response = await client.patch(url, headers=SUPABASE_HEADERS, json=data)
        else:
            raise HTTPException(status_code=400, detail="Unsupported HTTP method")

    if response.status_code >= 400:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.text
        )

    return response.json()