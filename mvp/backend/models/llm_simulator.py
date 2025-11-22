import re
from typing import Optional

def generate_summary(transcript: str, customer_id: Optional[str] = None):
    transcript_lower = transcript.lower()

    issue_category = "GENERAL"
    if any(word in transcript_lower for word in ["bill", "charge", "payment", "invoice", "roaming"]):
        issue_category = "BILLING"
    elif any(word in transcript_lower for word in ["service", "outage", "network", "signal", "tower"]):
        issue_category = "TECHNICAL"
    elif any(word in transcript_lower for word in ["upgrade", "plan", "change", "hotspot"]):
        issue_category = "SALES"
    elif any(word in transcript_lower for word in ["device", "phone", "iphone", "android", "turn on", "activate"]):
        issue_category = "DEVICE_SUPPORT"

    negative_words = ["frustrated", "angry", "upset", "terrible", "awful", "worst", "ridiculous", "unacceptable"]
    positive_words = ["great", "thank", "appreciate", "helpful", "excellent", "perfect"]

    sentiment = "NEUTRAL"
    sentiment_score = 0.0

    neg_count = sum(1 for word in negative_words if word in transcript_lower)
    pos_count = sum(1 for word in positive_words if word in transcript_lower)

    if neg_count > pos_count:
        sentiment = "FRUSTRATED" if neg_count < 3 else "ANGRY"
        sentiment_score = -0.6 if neg_count < 3 else -0.85
    elif pos_count > neg_count:
        sentiment = "SATISFIED"
        sentiment_score = 0.7

    urgency_keywords = ["urgent", "immediately", "right now", "asap", "emergency", "major problem"]
    urgency_level = "HIGH" if any(word in transcript_lower for word in urgency_keywords) else "MEDIUM"
    urgency_score = 0.85 if urgency_level == "HIGH" else 0.55

    key_facts = []
    amounts = re.findall(r'\$\d+(?:\.\d{2})?', transcript)
    for amount in amounts[:3]:
        key_facts.append(f"Amount mentioned: {amount}")

    phones = re.findall(r'\d{3}-\d{3}-\d{4}', transcript)
    for phone in phones[:2]:
        key_facts.append(f"Phone: {phone}")

    return {
        "issue_category": issue_category,
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "urgency_level": urgency_level,
        "urgency_score": urgency_score,
        "key_facts": key_facts[:5],
        "confidence": 0.94
    }

def generate_ticket(call_id: str, customer_id: str, transcript: str, resolution_applied: Optional[dict]):
    summary_data = generate_summary(transcript, customer_id)
    issue_desc = transcript[:200] + "..." if len(transcript) > 200 else transcript

    ticket = {
        "ticket_id": f"TKT-{call_id[-6:]}",
        "customer_id": customer_id,
        "category": summary_data["issue_category"],
        "priority": "HIGH" if summary_data["urgency_level"] == "HIGH" else "MEDIUM",
        "status": "RESOLVED" if resolution_applied else "OPEN",
        "issue_summary": issue_desc,
        "sentiment": summary_data["sentiment"],
        "key_facts": summary_data["key_facts"],
        "resolution_applied": resolution_applied.get("title") if resolution_applied else None,
        "auto_filled": True
    }

    return ticket
