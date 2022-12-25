from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:INSERTPASSWORD@localhost/my-notion'
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description=db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"
    
    def __init__(self, description):
        self.description = description
   
#return json object        
def format_event(event):
    return {
        "description": event.description,
        "id": event.id,
        "created_at":event.created_at
    }    
@app.route('/')
def test():
    return "test"

#create an event
@app.route('/events', methods = ['POST'])
def create_event():
    description=request.json['description']
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)
 
#get all events
@app.route('/events', methods = ['GET'])
def get_events():
    events=Event.query.order_by(Event.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events': event_list}
   
if __name__ == '__main__':
    app.run()