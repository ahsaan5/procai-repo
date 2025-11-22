from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from pathlib import Path

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

@router.websocket("/ws/call/{call_id}")
async def websocket_call_simulation(websocket: WebSocket, call_id: str):
    await websocket.accept()

    try:
        call_scripts = load_json("call_scripts.json")
        script = next((s for s in call_scripts if s["call_id"] == call_id), None)

        if not script:
            await websocket.send_json({"error": "Call script not found"})
            await websocket.close()
            return

        for line in script["transcript"]:
            await asyncio.sleep(line.get("delay", 2))
            await websocket.send_json({"type": "transcript_line", "data": line})

        await websocket.send_json({"type": "call_end", "call_id": call_id})

    except WebSocketDisconnect:
        print(f"Client disconnected from call {call_id}")
    except Exception as e:
        print(f"Error in WebSocket: {e}")
        await websocket.close()
