"""
Supervisor Dashboard API Routes
Provides endpoints for supervisor monitoring and intervention
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
from pathlib import Path

router = APIRouter(prefix="/api/supervisor", tags=["supervisor"])

# Data directory
DATA_DIR = Path(__file__).parent.parent.parent / "data"


def load_supervisor_demo():
    """Load supervisor demo scenario data"""
    with open(DATA_DIR / "supervisor_demo.json") as f:
        return json.load(f)


class InterventionRequest(BaseModel):
    call_id: str
    supervisor_id: str
    supervisor_name: str
    action: str  # "join_call", "send_message", "transfer"


class InterventionStep(BaseModel):
    call_id: str
    step_number: int
    completed: bool
    notes: Optional[str] = None


@router.get("/dashboard")
async def get_supervisor_dashboard():
    """
    Get supervisor dashboard overview with all active calls

    Returns:
    - List of active calls with real-time sentiment, risk scores
    - Overall metrics (avg sentiment, flagged calls, etc.)
    """
    demo_data = load_supervisor_demo()
    demo_scenario = demo_data["demo_scenario"]

    # Extract active calls
    active_calls = []
    for call in demo_scenario["demo_calls"]:
        active_calls.append({
            "call_id": call["call_id"],
            "customer_id": call["customer_id"],
            "customer_name": call["customer_name"],
            "agent_name": call["agent_name"],
            "issue_category": call["issue_category"],
            "sentiment": call["sentiment"],
            "sentiment_emoji": call["sentiment_emoji"],
            "risk_score": call["risk_score"],
            "is_flagged": call["is_flagged"],
            "status": call["status"],
            "call_duration_seconds": call["call_duration_seconds"],
            "customer_ltv": call["customer_details"]["ltv"],
            "plan": call["customer_details"]["plan"]
        })

    # Calculate metrics
    flagged_count = sum(1 for call in active_calls if call["is_flagged"])
    avg_risk = sum(call["risk_score"] for call in active_calls) / len(active_calls) if active_calls else 0

    sentiment_scores = {
        "SATISFIED": 4,
        "NEUTRAL": 3,
        "FRUSTRATED": 2,
        "ANGRY": 1
    }
    avg_sentiment_score = sum(sentiment_scores.get(call["sentiment"], 3) for call in active_calls) / len(active_calls) if active_calls else 3

    if avg_sentiment_score >= 3.5:
        avg_sentiment = "SATISFIED"
    elif avg_sentiment_score >= 2.5:
        avg_sentiment = "NEUTRAL"
    elif avg_sentiment_score >= 1.5:
        avg_sentiment = "FRUSTRATED"
    else:
        avg_sentiment = "ANGRY"

    return {
        "success": True,
        "data": {
            "active_calls": active_calls,
            "metrics": {
                "total_active_calls": len(active_calls),
                "flagged_calls": flagged_count,
                "avg_risk_score": round(avg_risk, 1),
                "avg_sentiment": avg_sentiment,
                "high_risk_calls": sum(1 for call in active_calls if call["risk_score"] >= 70)
            },
            "demo_info": {
                "scenario_id": demo_scenario["scenario_id"],
                "title": demo_scenario["title"],
                "duration_seconds": demo_scenario["duration_seconds"]
            }
        }
    }


@router.get("/call/{call_id}")
async def get_call_details(call_id: str):
    """
    Get detailed information about a specific call for supervisor review

    Returns:
    - Customer profile and history
    - Sentiment history timeline
    - Issue details and context
    - Transcript summary
    - Key phrases and indicators
    """
    demo_data = load_supervisor_demo()
    demo_calls = demo_data["demo_scenario"]["demo_calls"]

    # Find the call
    call_data = next((call for call in demo_calls if call["call_id"] == call_id), None)

    if not call_data:
        raise HTTPException(status_code=404, detail=f"Call {call_id} not found")

    return {
        "success": True,
        "data": {
            "call_id": call_data["call_id"],
            "customer_id": call_data["customer_id"],
            "customer_name": call_data["customer_name"],
            "agent_name": call_data["agent_name"],
            "issue_category": call_data["issue_category"],
            "sentiment": call_data["sentiment"],
            "sentiment_emoji": call_data["sentiment_emoji"],
            "risk_score": call_data["risk_score"],
            "is_flagged": call_data["is_flagged"],
            "status": call_data["status"],
            "call_duration_seconds": call_data["call_duration_seconds"],
            "customer_details": call_data["customer_details"],
            "issue_details": call_data["issue_details"],
            "sentiment_history": call_data["sentiment_history"],
            "transcript_summary": call_data["transcript_summary"],
            "key_phrases": call_data["key_phrases"],
            "flagged_at": call_data.get("flagged_at"),
            "flag_reason": call_data.get("flag_reason")
        }
    }


@router.get("/intervention-plan/{call_id}")
async def get_intervention_plan(call_id: str):
    """
    Get AI-generated intervention plan for a flagged call

    Returns:
    - Recommended action (join call, send message, etc.)
    - Step-by-step guided resolution
    - Scripts and talking points for each step
    - Expected outcomes and success metrics
    """
    demo_data = load_supervisor_demo()
    demo_calls = demo_data["demo_scenario"]["demo_calls"]

    # Find the call
    call_data = next((call for call in demo_calls if call["call_id"] == call_id), None)

    if not call_data:
        raise HTTPException(status_code=404, detail=f"Call {call_id} not found")

    if "ai_intervention_plan" not in call_data:
        return {
            "success": True,
            "data": {
                "available": False,
                "message": "No intervention plan available for this call"
            }
        }

    plan = call_data["ai_intervention_plan"]

    return {
        "success": True,
        "data": {
            "available": True,
            "call_id": call_id,
            "customer_name": call_data["customer_name"],
            "recommended_action": plan["recommended_action"],
            "confidence": plan["confidence"],
            "reasoning": plan["reasoning"],
            "guided_steps": plan["guided_steps"],
            "success_metrics": plan["success_metrics"]
        }
    }


@router.post("/intervene")
async def initiate_intervention(request: InterventionRequest):
    """
    Initiate supervisor intervention on a call

    Simulates supervisor joining the call or sending guidance to agent
    """
    demo_data = load_supervisor_demo()
    demo_calls = demo_data["demo_scenario"]["demo_calls"]

    # Find the call
    call_data = next((call for call in demo_calls if call["call_id"] == request.call_id), None)

    if not call_data:
        raise HTTPException(status_code=404, detail=f"Call {request.call_id} not found")

    # Simulate intervention start
    intervention_log = {
        "intervention_id": f"INT-{request.call_id}-001",
        "call_id": request.call_id,
        "supervisor_id": request.supervisor_id,
        "supervisor_name": request.supervisor_name,
        "action": request.action,
        "timestamp": "2024-05-15T14:23:45Z",
        "status": "in_progress",
        "customer_name": call_data["customer_name"],
        "agent_name": call_data["agent_name"]
    }

    return {
        "success": True,
        "data": intervention_log,
        "message": f"Supervisor {request.supervisor_name} joining call {request.call_id}"
    }


@router.post("/intervention-step")
async def complete_intervention_step(step: InterventionStep):
    """
    Mark an intervention step as completed

    Tracks supervisor progress through AI-guided intervention plan
    """
    return {
        "success": True,
        "data": {
            "call_id": step.call_id,
            "step_number": step.step_number,
            "completed": step.completed,
            "notes": step.notes,
            "timestamp": "2024-05-15T14:24:12Z"
        },
        "message": f"Step {step.step_number} marked as {'completed' if step.completed else 'incomplete'}"
    }


@router.post("/intervention-complete/{call_id}")
async def complete_intervention(call_id: str):
    """
    Mark intervention as complete and update call status

    Simulates sentiment recovery and risk reduction after successful intervention
    """
    demo_data = load_supervisor_demo()
    demo_calls = demo_data["demo_scenario"]["demo_calls"]

    # Find the call
    call_data = next((call for call in demo_calls if call["call_id"] == call_id), None)

    if not call_data:
        raise HTTPException(status_code=404, detail=f"Call {call_id} not found")

    # Simulate successful intervention outcome
    outcome = {
        "call_id": call_id,
        "intervention_successful": True,
        "sentiment_change": {
            "before": call_data["sentiment"],
            "after": "SATISFIED"
        },
        "risk_score_change": {
            "before": call_data["risk_score"],
            "after": 25
        },
        "churn_prevented": True,
        "customer_ltv_preserved": call_data["customer_details"]["ltv"],
        "intervention_duration_seconds": 360,
        "timestamp": "2024-05-15T14:29:45Z"
    }

    return {
        "success": True,
        "data": outcome,
        "message": "Intervention completed successfully - customer sentiment recovered"
    }


@router.get("/metrics")
async def get_supervisor_metrics():
    """
    Get supervisor performance metrics

    Returns:
    - Total interventions today
    - Success rate
    - Avg intervention time
    - Churn prevented value
    """
    return {
        "success": True,
        "data": {
            "today": {
                "total_interventions": 3,
                "successful_interventions": 3,
                "success_rate": 100.0,
                "avg_intervention_time_seconds": 342,
                "churn_prevented_count": 2,
                "churn_prevented_value": 5780.0,
                "avg_sentiment_improvement": 2.5
            },
            "this_week": {
                "total_interventions": 18,
                "successful_interventions": 17,
                "success_rate": 94.4,
                "churn_prevented_value": 34240.0
            }
        }
    }
