# app/core/config.py
import os
from dotenv import load_dotenv

load_dotenv()  # loads values from .env file

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

# Headers used for every Supabase REST API request
SUPABASE_HEADERS: dict = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}