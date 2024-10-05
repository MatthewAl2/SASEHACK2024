from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy.dialects.postgresql import ARRAY

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/SASEHACK2024'
db = SQLAlchemy(app)
CORS(app)

# User Table
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    xp = db.Column(db.Integer, nullable=False)
    tasklist = db.relationship('Task', backref='user', lazy=True)  # One-to-many relationship with Task
    tags = db.Column(ARRAY(db.String), nullable=True)  # Array of strings for tags
    created_by = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __init__(self, username, password, level, xp, tags):
        self.username = username
        self.password = password
        self.level = level
        self.xp = xp
        self.tags = tags

    def __repr__(self):
        return f"User({self.username}, Level: {self.level}, XP: {self.xp})"


# Task Table
class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=False)
    state = db.Column(db.Integer, nullable=False)  # Integer to represent task state (e.g. 0 = Incomplete, 1 = Complete)
    tag = db.Column(db.String(50), nullable=True)  # Single tag for task categorization
    description = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign Key to User
    
    def __init__(self, name, weight, start_date, end_date, state, tag, description, user_id):
        self.name = name
        self.weight = weight
        self.start_date = start_date
        self.end_date = end_date
        self.state = state
        self.tag = tag
        self.description = description
        self.user_id = user_id

    def __repr__(self):
        return f"Task({self.name}, Weight: {self.weight}, State: {self.state})"

# Utility function to format user and task objects for JSON responses
def format_user(user):
    return {
        "id": user.id,
        "username": user.username,
        "level": user.level,
        "xp": user.xp,
        "tags": user.tags,
        "created_by": user.created_by,
        "tasklist": [format_task(task) for task in user.tasklist]
    }

def format_task(task):
    return {
        "id": task.id,
        "name": task.name,
        "weight": task.weight,
        "start_date": task.start_date,
        "end_date": task.end_date,
        "state": task.state,
        "tag": task.tag,
        "description": task.description,
        "user_id": task.user_id
    }

# API Endpoints

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(
        username=data['username'],
        password=data['password'],
        level=data['level'],
        xp=data['xp'],
        tags=data.get('tags', [])
    )
    db.session.add(user)
    db.session.commit()
    return format_user(user), 201

# Create a new task for a user
@app.route('/users/<user_id>/tasks', methods=['POST'])
def create_task(user_id):
    data = request.json
    task = Task(
        name=data['name'],
        weight=data['weight'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d %H:%M:%S'),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d %H:%M:%S'),
        state=data['state'],
        tag=data['tag'],
        description=data['description'],
        user_id=user_id
    )
    db.session.add(task)
    db.session.commit()
    return format_task(task), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([format_user(user) for user in users])

# Get all tasks for a user
@app.route('/users/<user_id>/tasks', methods=['GET'])
def get_tasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([format_task(task) for task in tasks])

@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)  # Find the user or return 404 if not found
    data = request.json
    
    # Update the user's fields
    user.username = data.get('username', user.username)
    user.password = data.get('password', user.password)
    user.level = data.get('level', user.level)
    user.xp = data.get('xp', user.xp)
    user.tags = data.get('tags', user.tags)
    
    db.session.commit()
    return format_user(user)

@app.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)  # Find the task or return 404 if not found
    data = request.json
    
    # Update the task's fields
    task.name = data.get('name', task.name)
    task.weight = data.get('weight', task.weight)
    task.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d %H:%M:%S') if 'start_date' in data else task.start_date
    task.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d %H:%M:%S') if 'end_date' in data else task.end_date
    task.state = data.get('state', task.state)
    task.tag = data.get('tag', task.tag)
    task.description = data.get('description', task.description)
    
    db.session.commit()
    return format_task(task)

@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)  # Find the user or return 404 if not found
    db.session.delete(user)
    db.session.commit()
    return {"message": f"User {id} has been deleted"}, 200

@app.route('/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)  # Find the task or return 404 if not found
    db.session.delete(task)
    db.session.commit()
    return {"message": f"Task {id} has been deleted"}, 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
