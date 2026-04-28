# app/modules/dispatch/router.py
from fastapi import APIRouter
from app.modules.dispatch.schemas import DispatchCreate
from app.modules.dispatch import service

router = APIRouter(tags=["Dispatch"])


@router.get("/")
async def get_dispatches():
    return await service.get_all_dispatches()


@router.post("/")
async def create_dispatch(data: DispatchCreate):
    return await service.create_dispatch(data)


@router.put("/{id}")
async def update_dispatch(id: str, data: DispatchCreate):
    return await service.update_dispatch(id, data)


@router.patch("/{id}/post")
async def post_dispatch(id: str):
    return await service.post_dispatch(id)