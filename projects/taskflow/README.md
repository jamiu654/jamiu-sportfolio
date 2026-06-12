# TaskFlow - Task Management Application

A full-stack task management application built with Django (backend) and HTML/CSS/JavaScript (frontend).

## Features

- ✅ Create, read, update, and delete tasks
- 🎯 Set task priority (Low, Medium, High)
- 📊 Track task status (Pending, In Progress, Completed)
- 📈 Real-time statistics dashboard
- 🎨 Responsive and modern UI

## Tech Stack

- **Backend**: Django 4.2, Django REST Framework
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite3

## Setup Instructions

### 1. Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Create Superuser (Optional - for Django Admin)

```bash
python manage.py createsuperuser
```

### 5. Start Development Server

```bash
python manage.py runserver
```

The app will be available at `http://127.0.0.1:8000`

## API Endpoints

- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create a new task
- `GET /api/tasks/{id}/` - Get task details
- `PATCH /api/tasks/{id}/` - Update a task
- `DELETE /api/tasks/{id}/` - Delete a task
- `GET /api/tasks/stats/` - Get statistics

## Usage

1. Open the application in your browser
2. Add tasks using the input form
3. Set priority level for each task
4. Mark tasks as complete or delete them
5. View real-time statistics

## Deployment

For production deployment:
1. Set `DEBUG = False` in `config/settings.py`
2. Update `SECRET_KEY` with a secure random string
3. Configure `ALLOWED_HOSTS` for your domain
4. Use a production database (PostgreSQL recommended)
5. Deploy using Gunicorn or similar WSGI server

## Author

Jamiu - Full Stack Developer

## License

MIT License
