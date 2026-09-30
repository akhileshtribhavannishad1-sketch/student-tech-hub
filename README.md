# 🎓 Student Tech Hub

A beginner-friendly full-stack web application designed for student tech communities. This project demonstrates how a plain **HTML/CSS/JavaScript** frontend connects to a **Python FastAPI** backend using REST APIs and CORS.

---

## 🌟 What This Project Does

* **Event Catalog:** Displays upcoming technical workshops, bootcamps, and hackathons with dates, times, speakers, and venue details.
* **Live API Fetching:** Allows users to dynamically load events from the Python FastAPI backend server with a single click.
* **Student Registration:** Students can submit their name and email to register for events or join the hub community.
* **Full-Stack Connectivity:** Demonstrates real-time client-to-server communication using standard HTTP `GET` and `POST` methods and JSON payloads.

---

## 📁 Project Structure

```text
student-tech-hub/
├── frontend/
│   ├── index.html        # Clean, modern, responsive HTML5 layout
│   ├── style.css         # Modern styling, responsive grid, card designs
│   └── script.js         # Plain JavaScript for API requests & DOM updates
├── backend/
│   ├── main.py           # FastAPI application with CORS and endpoints
│   └── requirements.txt  # Python backend dependencies
└── README.md             # Project documentation & beginner guide
```

---

## 🚀 Quick Start Guide

### Step 1: Install & Run the Backend

Make sure you have **Python 3.9+** installed on your system.

1. **Open your terminal or command prompt** and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. **(Optional but recommended) Create and activate a virtual environment**:
   - **On Windows (PowerShell):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **On macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the server**:
   ```bash
   uvicorn main:app --reload
   ```
   > 🚀 **Open your browser and visit:** **`http://127.0.0.1:8000`** (or **`http://localhost:8000`**)  
   > 💡 Both the frontend web UI and backend APIs are automatically served together!  
   > 💡 You can also visit the interactive Swagger API documentation at: **`http://127.0.0.1:8000/docs`**

---

### Step 2: Open Frontend (Alternative options)

* **Direct browser access:** You can simply open [frontend/index.html](file:///c:/Users/AKHILESH/OneDrive/Desktop/student%20tech-hub/frontend/index.html) in your browser.
* **VS Code Live Server:** Right-click `frontend/index.html` and choose "Open with Live Server".

---

## 🔄 How Frontend and Backend Communicate

Here is a simple explanation of how data travels between the browser and the Python server:

```
+---------------------------+                     +---------------------------+
|         FRONTEND          |                     |          BACKEND          |
|    (HTML + CSS + JS)      |                     |      (Python FastAPI)     |
+---------------------------+                     +---------------------------+
              |                                                 |
              | --- 1. GET /api/events -----------------------> |
              | <--- 2. Returns JSON list of events ---------- |
              |                                                 |
              | --- 3. POST /api/register {name, email} ------> |
              | <--- 4. Returns JSON confirmation message ---- |
```

### 1. `GET /api/events` (Fetching Events)
* When you click the **"Load Events"** button, JavaScript calls the browser's built-in `fetch('http://127.0.0.1:8000/api/events')`.
* FastAPI receives the request, takes sample event objects from Python, and returns them as a JSON response.
* JavaScript parses the JSON and generates responsive cards inside the HTML page.

### 2. `POST /api/register` (Submitting Form)
* When a student fills out their name and email and clicks **"Complete Registration"**, JavaScript intercepts the form submit event.
* JavaScript packages the data into a JSON object and sends it via `fetch('http://127.0.0.1:8000/api/register', { method: 'POST', ... })`.
* FastAPI validates the data using a Pydantic model (`RegistrationRequest`), stores it in memory, and responds with a success status and friendly confirmation message.

### 3. CORS (Cross-Origin Resource Sharing)
* Because the frontend may run on a different origin (e.g. `file://` or `http://localhost:3000`) and the backend runs on `http://127.0.0.1:8000`, the browser's security rules require **CORS** headers.
* In `main.py`, FastAPI includes `CORSMiddleware` with `allow_origins=["*"]`, allowing smooth communication between frontend and backend.

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript (ES6+ `async/await`, `fetch`).
* **Backend:** Python 3, FastAPI, Uvicorn, Pydantic.
* **No heavy frameworks or databases:** Kept lightweight and clean for beginners to learn foundational full-stack web development.
