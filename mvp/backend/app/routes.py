from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
from pathlib import Path

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

@router.get("/customer/{customer_id}")
def get_customer(customer_id: str):
    customers = load_json("customers.json")
    customer = next((c for c in customers if c["customer_id"] == customer_id), None)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/billing/{customer_id}")
def get_billing(customer_id: str):
    billing_data = load_json("billing.json")
    bill = next((b for b in billing_data if b["customer_id"] == customer_id), None)
    if not bill:
        return {"customer_id": customer_id, "current_bill": {"amount": 0}, "recent_bills": []}
    return bill

@router.get("/network/{zip_code}")
def get_network_status(zip_code: str):
    network_data = load_json("network_status.json")
    status = next((n for n in network_data if n["zip"] == zip_code), None)
    if not status:
        return {"status": "NORMAL", "message": "No issues reported", "speed": "100 Mbps"}
    return status

@router.get("/tickets/{customer_id}")
def get_tickets(customer_id: str):
    tickets_data = load_json("tickets.json")
    customer_tickets = next((t for t in tickets_data if t["customer_id"] == customer_id), None)
    if not customer_tickets:
        return []
    return customer_tickets.get("tickets", [])

class SummarizeRequest(BaseModel):
    transcript: str
    customer_id: Optional[str] = None

@router.post("/summarize_call")
def summarize_call(request: SummarizeRequest):
    from models.llm_simulator import generate_summary
    return generate_summary(request.transcript, request.customer_id)

class ResolutionRequest(BaseModel):
    transcript: str
    customer_id: str
    issue_category: Optional[str] = None

@router.post("/suggest_resolutions")
def suggest_resolutions(request: ResolutionRequest):
    from models.resolution_engine import get_recommendations
    return get_recommendations(request.transcript, request.customer_id, request.issue_category)

class AutoFillRequest(BaseModel):
    call_id: str
    customer_id: str
    transcript: str
    resolution_applied: Optional[dict] = None

@router.post("/crm_autofill")
def crm_autofill(request: AutoFillRequest):
    from models.llm_simulator import generate_ticket
    return generate_ticket(request.call_id, request.customer_id, request.transcript, request.resolution_applied)

class FeedbackRequest(BaseModel):
    call_id: str
    customer_id: str
    aht_seconds: int
    customer_satisfied: bool
    agent_notes: Optional[str] = None
    resolution_successful: bool

@router.post("/end_call_feedback")
def end_call_feedback(request: FeedbackRequest):
    return {"status": "saved", "call_id": request.call_id, "metrics_updated": True}

@router.get("/metrics")
def get_metrics():
    return {
        "aht": {"current": 430, "baseline": 640, "improvement_percent": 32.8},
        "fcr": {"current": 87, "baseline": 68, "improvement_points": 19},
        "csat": {"current": 92, "baseline": 78, "improvement_points": 14},
        "solution_accuracy": 87,
        "agent_adoption": 78
    }
