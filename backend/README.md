# ⚙️ Student Tech Hub — Backend API

This folder contains the Python backend service built with **FastAPI** and **Uvicorn** for the Student Tech Hub project.

---

## ❓ Why Can't Browsers Open `.py` Files Directly?

* **Frontend Files (`.html`, `.css`, `.js`):** Web browsers have built-in engines to parse and render HTML/CSS/JS visually.
* **Backend Files (`main.py`):** Python is a server-side language that requires a Python runtime and an ASGI server (**Uvicorn**) to execute and serve network requests.
* **How to view the backend in your browser:** Once you start the server, open **`http://127.0.0.1:8000/docs`** to see the interactive web dashboard for this backend!

---

## 🚀 How to Run the Backend

1. **Open your terminal** and navigate to this folder:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**:
   ```bash
   uvicorn main:app --reload
   ```

---

## 🌐 Backend Browser URLs & Endpoints

When your backend is running, open these URLs in your browser:

| Endpoint | Method | Browser URL | Description |
| :--- | :--- | :--- | :--- |
| **Interactive Docs (Swagger UI)** | `GET` | [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs) | Visual dashboard to test all endpoints |
| **Alternative Docs (ReDoc)** | `GET` | [`http://127.0.0.1:8000/redoc`](http://127.0.0.1:8000/redoc) | Clean API documentation |
| **Events List** | `GET` | [`http://127.0.0.1:8000/api/events`](http://127.0.0.1:8000/api/events) | Returns list of upcoming technical events |
| **Register Student** | `POST` | `http://127.0.0.1:8000/api/register` | Accepts student name & email |
| **API Health Check** | `GET` | [`http://127.0.0.1:8000/api/health`](http://127.0.0.1:8000/api/health) | Verifies server is online |

---

## 📦 Files in this Folder

* **`main.py`**: The core FastAPI application containing:
  * CORS middleware configuration
  * Pydantic schemas for request validation
  * REST API route handlers (`/api/events`, `/api/register`, `/api/health`)
  * Static file mount for serving frontend UI simultaneously
* **`requirements.txt`**: Python dependencies list (`fastapi`, `uvicorn`, `pydantic`).
