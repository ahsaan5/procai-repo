#!/bin/bash

echo "🚀 Starting ProcAI Backend..."
echo ""
cd backend
python -m uvicorn app.main:app --reload --port 8000
