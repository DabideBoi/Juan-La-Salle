from extensions import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(20), nullable=False)

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(50), unique=False, nullable=False)
    receiver = db.Column(db.String(50), unique=False, nullable=False)
    date = db.Column(db.DateTime(), nullable=False)
    content = db.Column(db.String(512), nullable=False)
    is_new = db.Column(db.Boolean(), default=True, nullable=False)
    
class Notification(db.Model):
    __tablename__ = 'notification'
    id = db.Column(db.Integer, primary_key=True)
    sender_name = db.Column(db.String(50), unique=False, nullable=False)
    receiver_name = db.Column(db.String(50), unique=False, nullable=False)
    content = db.Column(db.String(512), nullable=False)

