from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI(title="ProcAI MVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

@app.get("/")
def root():
    return {"message": "ProcAI MVP API", "status": "running", "version": "1.0"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "data_loaded": True}

from app import routes
app.include_router(routes.router, prefix="/api")

from app import websocket_handler
app.include_router(websocket_handler.router)

from app import supervisor_routes
app.include_router(supervisor_routes.router)
