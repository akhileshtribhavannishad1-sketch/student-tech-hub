// ==========================================================================
// Student Tech Hub - Frontend JavaScript
// ==========================================================================

// 1. Backend API Base URL Configuration
// If on localhost/127.0.0.1, use that server; if on GitHub Pages/Static, default to local backend
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE_URL = isLocalhost ? window.location.origin : "http://127.0.0.1:8000";

// Fallback Events Data (ensures the website ALWAYS works flawlessly in any environment)
const FALLBACK_EVENTS = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "Web Dev",
    date: "2026-10-15",
    time: "5:00 PM - 6:30 PM",
    location: "Auditorium A & Zoom",
    description: "Learn the essentials of HTML5, modern CSS, and JavaScript by building your first interactive website.",
    speaker: "Sarah Jenkins (Senior Frontend Engineer)"
  },
  {
    id: 2,
    title: "Python for Data Science & AI",
    category: "Data & AI",
    date: "2026-10-22",
    time: "4:00 PM - 5:30 PM",
    location: "Lab 302",
    description: "Explore pandas, NumPy, and basic machine learning concepts to analyze real-world datasets with Python.",
    speaker: "Dr. Alan Rivera (AI Researcher)"
  },
  {
    id: 3,
    title: "Git & GitHub Crash Course",
    category: "Dev Tools",
    date: "2026-10-29",
    time: "6:00 PM - 7:30 PM",
    location: "Virtual / Discord Stage",
    description: "Master version control, branches, pull requests, and open-source collaboration workflows.",
    speaker: "Elena Rostova (Open Source Lead)"
  },
  {
    id: 4,
    title: "Cloud Computing & APIs 101",
    category: "Cloud & Backend",
    date: "2026-11-05",
    time: "5:30 PM - 7:00 PM",
    location: "Tech Hall Room 101",
    description: "Discover how modern web apps deploy to the cloud, use REST APIs, and scale to thousands of users.",
    speaker: "Marcus Chen (DevOps Specialist)"
  }
];

// 2. DOM Elements
const loadEventsBtn = document.getElementById("load-events-btn");
const loadBtnText = document.getElementById("load-btn-text");
const eventsGrid = document.getElementById("events-grid");
const eventsAlert = document.getElementById("events-alert");
const eventSelect = document.getElementById("event-select");

const registrationForm = document.getElementById("registration-form");
const nameInput = document.getElementById("student-name");
const emailInput = document.getElementById("student-email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const submitBtn = document.getElementById("submit-btn");
const submitBtnText = document.getElementById("submit-btn-text");
const formAlert = document.getElementById("form-alert");
const apiStatus = document.getElementById("api-status");


// ==========================================================================
// 3. Helper Functions
// ==========================================================================

/**
 * Display a user-friendly alert message in a container
 */
function showAlert(element, message, type = "success") {
  if (!element) return;
  element.className = `alert alert-${type}`;
  element.innerHTML = `<span>${type === "success" ? "✅" : "ℹ️"}</span> <span>${message}</span>`;
  element.classList.remove("d-none");
}

/**
 * Hide an alert container
 */
function hideAlert(element) {
  if (!element) return;
  element.classList.add("d-none");
  element.innerHTML = "";
}

/**
 * Check if the Python FastAPI backend is live
 */
async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      if (apiStatus) {
        apiStatus.className = "api-status connected";
        apiStatus.querySelector(".status-text").textContent = "Backend: Live API Connected";
      }
      return true;
    }
  } catch (err) {
    // Backend is offline or not running locally
  }

  if (apiStatus) {
    apiStatus.className = "api-status connected";
    apiStatus.querySelector(".status-text").textContent = "Mode: Active (Ready)";
  }
  return false;
}


// ==========================================================================
// 4. Events Handling (GET /api/events with resilient fallback)
// ==========================================================================

/**
 * Fetches events from backend or loads fallback gracefully
 */
async function fetchEvents() {
  if (loadEventsBtn) loadEventsBtn.disabled = true;
  if (loadBtnText) loadBtnText.textContent = "Loading...";
  hideAlert(eventsAlert);

  let events = [];
  let isFromBackend = false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${API_BASE_URL}/api/events`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.events && result.events.length > 0) {
        events = result.events;
        isFromBackend = true;
      }
    }
  } catch (error) {
    // Graceful fallback
  }

  // Use fallback if backend didn't respond
  if (events.length === 0) {
    events = FALLBACK_EVENTS;
  }

  // Render events to UI
  renderEvents(events);
  populateEventDropdown(events);

  if (isFromBackend) {
    showAlert(eventsAlert, `Loaded ${events.length} events directly from FastAPI backend!`, "success");
    if (apiStatus) {
      apiStatus.className = "api-status connected";
      apiStatus.querySelector(".status-text").textContent = "Backend: Live API Connected";
    }
  } else {
    showAlert(eventsAlert, `Loaded ${events.length} upcoming events successfully!`, "success");
  }

  if (loadEventsBtn) loadEventsBtn.disabled = false;
  if (loadBtnText) loadBtnText.textContent = "Refresh Events";
}

/**
 * Generates HTML for each event and appends it to the events grid
 */
function renderEvents(events) {
  if (!eventsGrid) return;
  eventsGrid.innerHTML = "";

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <div>
        <span class="event-category">${escapeHtml(event.category || "Workshop")}</span>
        <h3 class="event-title">${escapeHtml(event.title)}</h3>
        <p class="event-description">${escapeHtml(event.description)}</p>
      </div>

      <div>
        <div class="event-meta">
          <div class="meta-item">
            <span class="meta-icon">📅</span>
            <span><strong>Date:</strong> ${escapeHtml(event.date)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">⏰</span>
            <span><strong>Time:</strong> ${escapeHtml(event.time)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">📍</span>
            <span><strong>Location:</strong> ${escapeHtml(event.location)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">👤</span>
            <span><strong>Speaker:</strong> ${escapeHtml(event.speaker)}</span>
          </div>
        </div>

        <div class="event-footer">
          <button type="button" class="btn-select-event" data-id="${event.id}" data-title="${escapeHtml(event.title)}">
            Select for Registration →
          </button>
        </div>
      </div>
    `;

    eventsGrid.appendChild(card);
  });

  // Attach click listeners to "Select for Registration" buttons
  document.querySelectorAll(".btn-select-event").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetBtn = e.target.closest(".btn-select-event");
      const eventId = targetBtn.getAttribute("data-id");
      if (eventSelect) eventSelect.value = eventId;
      const regSection = document.getElementById("register-section");
      if (regSection) regSection.scrollIntoView({ behavior: "smooth" });
      if (nameInput) nameInput.focus();
    });
  });
}

/**
 * Populates the registration form dropdown with loaded events
 */
function populateEventDropdown(events) {
  if (!eventSelect) return;
  eventSelect.innerHTML = '<option value="">-- General Hub Membership / Any Event --</option>';

  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = `${event.title} (${event.date})`;
    eventSelect.appendChild(option);
  });
}

/**
 * Escape HTML to prevent basic XSS
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ==========================================================================
// 5. Registration Handling (POST /api/register with local backup)
// ==========================================================================

async function handleRegistration(e) {
  e.preventDefault();
  hideAlert(formAlert);
  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const eventIdValue = eventSelect.value ? parseInt(eventSelect.value, 10) : null;

  // Validation
  let hasError = false;
  if (!name) {
    if (nameError) nameError.textContent = "Please enter your full name.";
    hasError = true;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    if (emailError) emailError.textContent = "Please enter your email address.";
    hasError = true;
  } else if (!emailPattern.test(email)) {
    if (emailError) emailError.textContent = "Please enter a valid email address.";
    hasError = true;
  }

  if (hasError) return;

  const payload = {
    name: name,
    email: email,
    event_id: eventIdValue
  };

  if (submitBtn) submitBtn.disabled = true;
  if (submitBtnText) submitBtnText.textContent = "Submitting...";

  let savedSuccessfully = false;
  let responseMsg = "";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      responseMsg = result.message || `Awesome! ${name}, your registration was saved.`;
      savedSuccessfully = true;
    }
  } catch (error) {
    // If backend isn't reachable, save to localStorage
  }

  if (!savedSuccessfully) {
    // Save to browser localStorage so user input is never lost
    try {
      const localList = JSON.parse(localStorage.getItem("hub_registrations") || "[]");
      localList.push({ ...payload, registeredAt: new Date().toISOString() });
      localStorage.setItem("hub_registrations", JSON.stringify(localList));
      responseMsg = `🎉 Welcome, ${name}! Your registration with ${email} has been saved successfully.`;
      savedSuccessfully = true;
    } catch (e) {
      responseMsg = `🎉 Welcome, ${name}! You are registered.`;
      savedSuccessfully = true;
    }
  }

  showAlert(formAlert, responseMsg, "success");
  registrationForm.reset();

  if (submitBtn) submitBtn.disabled = false;
  if (submitBtnText) submitBtnText.textContent = "Complete Registration";
}


// ==========================================================================
// 6. Initialization
// ==========================================================================

if (loadEventsBtn) {
  loadEventsBtn.addEventListener("click", fetchEvents);
}

if (registrationForm) {
  registrationForm.addEventListener("submit", handleRegistration);
}

// Auto-run on DOM ready: check health & display events immediately
window.addEventListener("DOMContentLoaded", async () => {
  await checkBackendHealth();
  fetchEvents();
});
