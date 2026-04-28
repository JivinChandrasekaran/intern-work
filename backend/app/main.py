# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router

app = FastAPI(
    title="Gas Cylinder Inventory API",
    version="1.0.0",
    description="Backend API for Gas Cylinder Dispatch, Return and Location Tracking"
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Include all routers under /api/v1 ──
app.include_router(api_router, prefix="/api/v1")
@app.get("/")
def root():
    return {"msg": "API WORKING"}