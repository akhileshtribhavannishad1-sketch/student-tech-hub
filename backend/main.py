from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List

# 1. Initialize the FastAPI app
app = FastAPI(
    title="Student Tech Hub API",
    description="A beginner-friendly API for managing technical student events and registrations",
    version="1.0.0",
)

# 2. Configure CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define the Data Schema for Registrations using Pydantic
class RegistrationRequest(BaseModel):
    name: str
    email: str
    event_id: int | None = None  # Optional field in case student selects a specific event

# 4. In-memory sample events data
SAMPLE_EVENTS = [
    {
        "id": 1,
        "title": "Introduction to Web Development",
        "category": "Web Dev",
        "date": "2026-10-15",
        "time": "5:00 PM - 6:30 PM",
        "location": "Auditorium A & Zoom",
        "description": "Learn the essentials of HTML5, modern CSS, and JavaScript by building your first interactive website.",
        "speaker": "Sarah Jenkins (Senior Frontend Engineer)"
    },
    {
        "id": 2,
        "title": "Python for Data Science & AI",
        "category": "Data & AI",
        "date": "2026-10-22",
        "time": "4:00 PM - 5:30 PM",
        "location": "Lab 302",
        "description": "Explore pandas, NumPy, and basic machine learning concepts to analyze real-world datasets with Python.",
        "speaker": "Dr. Alan Rivera (AI Researcher)"
    },
    {
        "id": 3,
        "title": "Git & GitHub Crash Course",
        "category": "Dev Tools",
        "date": "2026-10-29",
        "time": "6:00 PM - 7:30 PM",
        "location": "Virtual / Discord Stage",
        "description": "Master version control, branches, pull requests, and open-source collaboration workflows.",
        "speaker": "Elena Rostova (Open Source Lead)"
    },
    {
        "id": 4,
        "title": "Cloud Computing & APIs 101",
        "category": "Cloud & Backend",
        "date": "2026-11-05",
        "time": "5:30 PM - 7:00 PM",
        "location": "Tech Hall Room 101",
        "description": "Discover how modern web apps deploy to the cloud, use REST APIs, and scale to thousands of users.",
        "speaker": "Marcus Chen (DevOps Specialist)"
    }
]

# Simple in-memory list to store received registrations
registrations_db = []


# 5. API Endpoints

@app.get("/api/health")
def health_check():
    """Health check endpoint to verify backend is working."""
    return {
        "status": "success",
        "message": "Student Tech Hub API is online!"
    }


@app.get("/api/events")
def get_events():
    """
    GET /api/events
    Returns the list of upcoming technical events.
    """
    return {
        "status": "success",
        "count": len(SAMPLE_EVENTS),
        "events": SAMPLE_EVENTS
    }


@app.post("/api/register", status_code=201)
def register_student(payload: RegistrationRequest):
    """
    POST /api/register
    Accepts student registration with name and email, and stores it in memory.
    """
    name_clean = payload.name.strip()
    if not name_clean:
        raise HTTPException(status_code=400, detail="Name cannot be empty.")

    registration_record = {
        "name": name_clean,
        "email": payload.email,
        "event_id": payload.event_id
    }
    registrations_db.append(registration_record)

    return {
        "status": "success",
        "message": f"Awesome! {name_clean}, you have successfully registered with {payload.email}.",
        "data": registration_record
    }


# 6. Serve Frontend Static Files (HTML, CSS, JS)
# This allows opening http://127.0.0.1:8000 directly to see the full UI web app!
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
