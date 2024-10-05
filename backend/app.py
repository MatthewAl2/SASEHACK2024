from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

from flask import Flask, request, jsonify
import torch
from transformers import BertTokenizer
from task_weight_prediction.DNN import TaskWeightModel
from sqlalchemy.dialects.postgresql import ARRAY

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/SASEHACK2024'
db = SQLAlchemy(app)
CORS(app)

# Initialize tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = TaskWeightModel(bert_model_name='bert-base-uncased')

# Load the saved model weights
model.load_state_dict(torch.load('task_weight_prediction/task_weight_model.pth'))
model.eval()  # Set the model to evaluation mode

# Define max sequence length for tokenization
max_len = 50

# Route to get task weight
@app.route('/predict_task_weight', methods=['POST'])
def predict():
    data = request.json
    task_description = data.get('task')
    
    # Tokenize the input text
    encoding = tokenizer.encode_plus(
        task_description,
        add_special_tokens=True,
        max_length=max_len,
        padding='max_length',
        return_attention_mask=True,
        return_tensors='pt',
        truncation=True
    )

    input_ids = encoding['input_ids']
    attention_mask = encoding['attention_mask']

    # Make prediction using the model
    with torch.no_grad():
        output = model(input_ids=input_ids, attention_mask=attention_mask)
        predicted_weight = output.item()  # Get the predicted task weight

    return jsonify({'predicted_weight': predicted_weight})

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
   pomodoro = db.Column(db.Integer, nullable=False)
   
   def __init__(self, username, password, level, xp, tags):
      self.username = username
      self.password = password
      self.level = level
      self.xp = xp
      self.tags = tags
      self.pomodoro = 0
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
   tags = db.Column(ARRAY(db.String), nullable=True)  # Single tag for task categorization
   description = db.Column(db.String(255), nullable=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign Key to User
   daily_task = db.Column(db.Integer, nullable=False)
   
   def __init__(self, name, weight, start_date, end_date, state, tags, description, user_id, daily_task):
      self.name = name
      self.weight = weight
      self.start_date = start_date
      self.end_date = end_date
      self.state = state
      self.tags = tags
      self.description = description
      self.user_id = user_id
      self.daily_task = daily_task

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
      "tasklist": [format_task_user(task) for task in user.tasklist],
      "pomodoro": user.pomodoro
   }

def format_all(user):
   return {
      "id": user.id,
      "username": user.username,
   }

def format_password(user):
   return {
      "id": user.id,
      "username": user.username,
      "password": user.password
   }

def format_task(task):
   return {
      "id": task.id,
      "name": task.name,
      "weight": task.weight,
      "start_date": task.start_date,
      "end_date": task.end_date,
      "state": task.state,
      "tags": task.tags,
      "description": task.description,
      "user_id": task.user_id,
      "daily_task": task.daily_task
   }

def format_task_user(task):
   return {
      "id": task.id,
      "name": task.name,
      "state": task.state
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
      tags=data['tags'],
      description=data['description'],
      user_id=user_id,
      daily_task=data['daily_task']
   )


   user = User.query.get(user_id)
   if not user:
      return jsonify({"error": "User not found"}), 404
   new_tags = data.get('tags', [])  # Safely get the 'tags' value from the incoming data; default to empty list

   if not isinstance(new_tags, list):
      return jsonify({"error": "Tags must be provided as an array"}), 400  # Return error if not a list

   # Ensure the tags field is initialized as a list
   if user.tags is None:
      user.tags = []  # Initialize as an empty list if tags is None
   elif not isinstance(user.tags, list):
      user.tags = []  # Ensure it is a list if it was not initialized correctly

   # Debugging: Check the current tags
   print(f"Current tags before appending: {user.tags}")

   # Remove duplicates from new_tags
   new_tags_set = set(new_tags)  # Convert to a set to eliminate duplicates

   # Concatenate the new tags that do not already exist in user.tags
   user.tags = list(set(user.tags) | new_tags_set)
   db.session.add(task)
   db.session.commit()
   return format_task(task), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
   users = User.query.all()
   return jsonify([format_all(user) for user in users])

# Get one users
@app.route('/users/<user_id>/', methods=['GET'])
def get_user(user_id):
   user = User.query.get(user_id)
   return jsonify([format_user(user)])

# Get one users
@app.route('/users/<user_id>/password', methods=['GET'])
def get_user_password(user_id):
   user = User.query.get(user_id)
   return jsonify([format_password(user)])

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
   user.pomodoro = data.get('pomodoro', user.pomodoro)
   
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
