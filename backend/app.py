from flask import Flask, Request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/SASEHACK2024'
db = SQLAlchemy(app)

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

