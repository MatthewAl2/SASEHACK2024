from flask import Flask, Request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

from flask import Flask, request, jsonify
import torch
from transformers import BertTokenizer, BertModel
import torch.nn as nn
from task_weight_prediction.DNN import TaskWeightModel, TaskDataset, DataLoader, train_model, evaluate_model

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/SASEHACK2024'
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

class Event(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   description = db.Column(db.String(100), nullable=False)
   created_at = db.Column(db.DateTime, nullable=False, default=datetime)

   def __repr__(self):
      return f"Event: {self.description}"
    
   def __init__(self, description):
      self.description = description

def format_event(event):
   return {
      "description": event.description,
      "id": event.id,
      "created_at": event.created_at
   }

@app.route('/')
def hello():
    return 'Hello World!'

# Create an event
@app.route('/events', methods=['POST'])
def create_event():
    event = Event(description=Request.json['description'])
    db.session.add(event)
    db.session.commit()
    return format_event(event)    

# Get all events
@app.route('/events', methods=['GET'])
def get_events():
   events = Event.query.order_by(Event.id.asc()).all()
   event_list = []
   for event in events:
      event_list.append(format_event(event))
   return {"events": event_list}

# Get a specific event
@app.route('/events/<id>', methods=['GET'])
def get_event(id):
   event = Event.query.filter_by(id=id).one()
   formated_event = format_event(event)
   return {"event": formated_event}

# Update an event
@app.route('/events/<id>', methods=['PUT'])
def update_event(id):
   event = Event.query.filter_by(id=id).one()
   event.description = Request.json['description']
   db.session.commit()
   return format_event(event)

# Delete an event
@app.route('/events/<id>', methods=['DELETE'])
def delete_event(id):
   event = Event.query.filter_by(id=id).one()
   db.session.delete(event)
   db.session.commit()
   return {"message": "Event has been deleted"}




if __name__ == '__main__':
   with app.app_context():
      db.create_all()
   app.run()

