"""
Jamiu Portfolio - Flask Backend
================================
A lightweight Flask application that serves the portfolio website
with a real contact form API, terminal command endpoints, and
static file serving.

Run: python app.py
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os
import re
import json

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# In-memory storage for demo (replace with database in production)
contact_submissions = []
visitor_logs = []

# ========================================
# TERMINAL COMMAND DATA
# ========================================
TERMINAL_COMMANDS = {
    "help": {
        "description": "Show available commands",
        "response": """Available commands:

  help        Show this help message
  about       Learn about me
  skills      View my technical skills
  projects    See my featured projects
  experience  View my work experience
  contact     Get my contact information
  clear       Clear the terminal
  whoami      Display user info
  date        Show current date and time

Type any command to explore. Use up/down arrows for history."""
    },
    "about": {
        "description": "Learn about me",
        "response": """=== ABOUT JAMIU ===

Name: Jamiu
Role: Full Stack Developer
Experience: 2.5 Years
Location: Available Worldwide

Philosophy:
- Problem-first approach to development
- Scale-minded architecture decisions
- Collaborative team player
- Clean code advocate

I believe great software bridges elegant UX with
robust backend architecture. Every line of code
should serve a purpose and stand the test of time."""
    },
    "skills": {
        "description": "View technical skills",
        "response": """=== TECHNICAL SKILLS ===

Frontend:
  React / Next.js      ██████████████████████████████████████████████████ 92%
  TypeScript           ████████████████████████████████████████████████ 88%
  Tailwind CSS         ██████████████████████████████████████████████████ 90%
  HTML5 / CSS3         █████████████████████████████████████████████████████ 95%

Backend:
    APIs (Django)        ██████████████████████████████████████████████████ 90%
    Python / Django      ████████████████████████████████████████████ 78%
  REST API Design      ████████████████████████████████████████████████ 88%
  GraphQL              ███████████████████████████████████████████ 75%

Databases & Cloud:
  PostgreSQL           █████████████████████████████████████████████ 85%
  MongoDB              ████████████████████████████████████████████ 80%
  Docker               ████████████████████████████████████████████ 78%
  AWS / Vercel         ███████████████████████████████████████████ 76%"""
    },
    "projects": {
        "description": "View featured projects",
        "response": """=== FEATURED PROJECTS ===

1. DevConnect - Developer Social Network
    Tech: React, Django, WebSockets, MongoDB
   Features: Real-time messaging, code sharing
   Status: Production Ready

2. FinSphere - Finance Dashboard
   Tech: Next.js, Python, PostgreSQL, D3.js
   Features: Expense tracking, AI insights
   Status: Production Ready

3. ShopPulse - E-commerce Platform
    Tech: React, Django, Redis, Stripe
   Features: Inventory, payments, PWA
   Status: Production Ready

Total Projects: 30+"""
    },
    "experience": {
        "description": "View work experience",
        "response": """=== PROFESSIONAL EXPERIENCE ===

Full Stack Developer | Tech Solutions Inc.
2023 - Present | 1.5 Years
- Leading client integrations
- Scalable RESTful APIs (10K+ daily requests)
- DB query optimization (40% latency reduction)
- Microservices architecture

Junior Developer | Digital Agency Co.
2022 - 2023 | 1 Year
- React components & UI libraries
- Unit testing with Jest (85% coverage)
- Django (DRF) REST APIs
- E-commerce platform development

Software Intern | StartupHub
2022 - 2022
- Full-stack fundamentals
- CRUD applications
- Git workflows & open-source"""
    },
    "contact": {
        "description": "Get contact info",
        "response": """=== CONTACT INFORMATION ===

Email:    jamiu.dev@email.com
GitHub:   github.com/jamiu-dev
LinkedIn: linkedin.com/in/jamiu-dev
Location: Available Worldwide

Status: Open to opportunities

Feel free to reach out for collaborations,
job opportunities, or just to say hello!"""
    },
    "whoami": {
        "description": "User info",
        "response": """visitor@portfolio

You are a curious recruiter or developer
exploring Jamiu's interactive portfolio.

Tip: Try the 'skills' or 'projects' command
to learn more about my work."""
    },
    "date": {
        "description": "Current date/time",
        "response": None  # Generated dynamically
    },
    "welcome": {
        "description": "Welcome message",
        "response": """    ██╗ █████╗ ███╗   ███╗██╗██╗   ██╗
    ██║██╔══██╗████╗ ████║██║██║   ██║
    ██║███████║██╔████╔██║██║██║   ██║
    ██║██╔══██║██║╚██╔╝██║██║██║   ██║
    ██║██║  ██║██║ ╚═╝ ██║██║╚██████╔╝
    ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝ ╚═════╝

Welcome to my interactive portfolio terminal!

Type 'help' to see available commands."""
    }
}

# ========================================
# ROUTES
# ========================================

@app.route('/')
def index():
    """Serve the main portfolio page."""
    return send_from_directory('.', 'index.html')


@app.route('/api/terminal', methods=['POST'])
def terminal_command():
    """
    Process terminal commands.

    Request body: {"command": "help"}
    Response: {"command": "help", "response": "...", "timestamp": "..."}
    """
    data = request.get_json()

    if not data or 'command' not in data:
        return jsonify({
            "error": "Missing 'command' field",
            "timestamp": datetime.utcnow().isoformat()
        }), 400

    cmd = data['command'].strip().lower()

    # Handle special dynamic commands
    if cmd == 'date':
        now = datetime.now()
        response_text = now.strftime('%A, %B %d, %Y') + '\n' + now.strftime('%I:%M:%S %p') + '\n\nServer time: UTC' + now.strftime('%z')
    elif cmd == 'clear':
        response_text = "__CLEAR__"
    elif cmd in TERMINAL_COMMANDS:
        response_text = TERMINAL_COMMANDS[cmd]['response']
    else:
        response_text = "Command not found: '" + cmd + "'\n\nType 'help' to see available commands."

    # Log the command
    visitor_logs.append({
        "command": cmd,
        "ip": request.remote_addr,
        "timestamp": datetime.utcnow().isoformat(),
        "user_agent": request.headers.get('User-Agent', 'Unknown')
    })

    return jsonify({
        "command": cmd,
        "response": response_text,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "success" if cmd in TERMINAL_COMMANDS or cmd == 'date' else "not_found"
    })


@app.route('/api/terminal/commands', methods=['GET'])
def list_commands():
    """Get list of all available terminal commands."""
    commands_list = [
        {"name": name, "description": info["description"]}
        for name, info in TERMINAL_COMMANDS.items()
    ]

    return jsonify({
        "commands": commands_list,
        "count": len(commands_list),
        "timestamp": datetime.utcnow().isoformat()
    })


@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """
    Submit a contact form message.

    Request body: {"name": "...", "email": "...", "subject": "...", "message": "..."}
    Response: {"success": true, "message": "...", "submission_id": "..."}
    """
    data = request.get_json()

    # Validation
    if not data:
        return jsonify({
            "success": False,
            "error": "No data provided",
            "timestamp": datetime.utcnow().isoformat()
        }), 400

    required_fields = ['name', 'email', 'subject', 'message']
    missing = [f for f in required_fields if not data.get(f, '').strip()]

    if missing:
        return jsonify({
            "success": False,
            "error": "Missing required fields: " + ', '.join(missing),
            "timestamp": datetime.utcnow().isoformat()
        }), 400

    # Email validation
    email = data['email'].strip()
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        return jsonify({
            "success": False,
            "error": "Invalid email address format",
            "timestamp": datetime.utcnow().isoformat()
        }), 400

    # Create submission
    submission = {
        "id": len(contact_submissions) + 1,
        "name": data['name'].strip(),
        "email": email,
        "subject": data['subject'].strip(),
        "message": data['message'].strip(),
        "ip": request.remote_addr,
        "timestamp": datetime.utcnow().isoformat(),
        "user_agent": request.headers.get('User-Agent', 'Unknown'),
        "read": False
    }

    contact_submissions.append(submission)

    # In production, you would send an email here
    # send_email_notification(submission)

    return jsonify({
        "success": True,
        "message": "Message received! I'll get back to you soon.",
        "submission_id": submission["id"],
        "timestamp": submission["timestamp"]
    })


@app.route('/api/contact/submissions', methods=['GET'])
def get_submissions():
    """
    Get all contact form submissions (admin endpoint).
    In production, add authentication here.
    """
    return jsonify({
        "submissions": contact_submissions,
        "count": len(contact_submissions),
        "timestamp": datetime.utcnow().isoformat()
    })


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get portfolio statistics."""
    return jsonify({
        "projects_completed": 30,
        "years_experience": 2.5,
        "happy_clients": 100,
        "terminal_commands_executed": len(visitor_logs),
        "contact_submissions": len(contact_submissions),
        "timestamp": datetime.utcnow().isoformat()
    })


@app.route('/api/visitor/log', methods=['POST'])
def log_visitor():
    """Log a visitor interaction."""
    data = request.get_json() or {}

    log_entry = {
        "ip": request.remote_addr,
        "timestamp": datetime.utcnow().isoformat(),
        "user_agent": request.headers.get('User-Agent', 'Unknown'),
        "referrer": data.get('referrer', 'Direct'),
        "page": data.get('page', '/')
    }

    visitor_logs.append(log_entry)

    return jsonify({
        "success": True,
        "timestamp": log_entry["timestamp"]
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "service": "Jamiu Portfolio API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "uptime": "running"
    })


# ========================================
# STATIC FILE SERVING
# ========================================

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS, images, etc.)."""
    return send_from_directory('.', filename)


# ========================================
# ERROR HANDLERS
# ========================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Not found",
        "message": "The requested resource was not found.",
        "timestamp": datetime.utcnow().isoformat()
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": "Something went wrong on our end.",
        "timestamp": datetime.utcnow().isoformat()
    }), 500


# ========================================
# MAIN
# ========================================

if __name__ == '__main__':
    print("=" * 50)
    print("  JAMIU PORTFOLIO - Flask Server")
    print("=" * 50)
    print("\nStarting server on http://127.0.0.1:5000")
    print("Press Ctrl+C to stop\n")

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )