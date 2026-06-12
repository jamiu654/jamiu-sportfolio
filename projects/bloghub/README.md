# BlogHub - Modern Blog Platform

A full-stack blogging platform built with Django (backend) and HTML/CSS/JavaScript (frontend).

## Features

- 📝 Create, read, update, and delete blog posts
- 🏷️ Categorize posts
- ⭐ Mark posts as featured
- 🔍 Search and filter by category
- 📱 Responsive and elegant design

## Tech Stack

- **Backend**: Django 4.2, Django REST Framework
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite3

## Setup Instructions

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Visit `http://127.0.0.1:8000`

## API Endpoints

- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create new post
- `GET /api/posts/{slug}/` - Get post details
- `PATCH /api/posts/{slug}/` - Update post
- `DELETE /api/posts/{slug}/` - Delete post

## Author

Jamiu - Full Stack Developer
