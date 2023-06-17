from flask import Flask, session
from api.routes import api
from sites.routes import site
from extensions import db
from datamodels import User
from flask_cors import CORS
import json

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    CORS(app)
    db.init_app(app)
    with app.app_context():
        db.create_all()
        """
        with open('ml_files/intents.json') as file:
            data = json.load(file)
        tags = []
        for intent in data['intents']:
            tags.append(intent['tag'])
            print(intent['tag'])
        for tagz in tags:
            record = Freq_Counter(tag=tagz, freq=0)
            db.session.add(record)
        """
        if not User.query.filter(User.username == 'admin@example.com').first():
            new_user = User(username='admin@example.com', password='123123123', role='admin')
            db.session.add(new_user)
            db.session.commit()
    app.register_blueprint(api)
    app.register_blueprint(site)
    return app
