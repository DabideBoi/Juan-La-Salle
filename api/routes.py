from flask import Blueprint, Flask, render_template, request, redirect, url_for, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, jsonify, redirect
from keras.models import load_model
from flask_cors import CORS
from api.chat import getResponse, predict_class
import api.messaging as ms
import sites.routes as sites
import json
from extensions import db
from datamodels import User, Message
from api.gpt_model import REMI, SPAMI

api = Blueprint('api', __name__)

model = load_model("ml_files/chatbot_model.h5")
intents = json.loads(open("ml_files/intents.json").read())
        

@api.route('/login', methods=['POST'])
def login():
    print("Login from:", request.remote_addr)
    username = request.form['username']
    password = request.form['password']

    # Check if the entered username and password match a user in the database
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        session['username'] = username
        session['role'] = user.role
        session['logged_in'] = True 
        return redirect(url_for('site.home'))
    else:
        return 'Invalid username or password'

@api.route('/logout')
def logout():
    # remove the user's username from the session data
    session.pop('username', None)
    session.pop('role', None)
    session.pop('logged_in', None)
    # redirect to the login page
    return render_template("login.html")

@api.route('/register', methods=['POST'])
def register_user():
    username = request.form['username']
    password = request.form['password']
    role = "student"

    # Check if the entered username is already taken
    user = User.query.filter_by(username=username).first()                                                                                                                                                                                                                                                                                                                                                                                            
    if user:
        return render_template('existing_user.html')
    else:
        # Create a new user
        new_user = User(username=username, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return render_template('new_user.html')

@api.route('/predict', methods=['POST'])
def predict():
    text = request.get_json().get("message")
    res = ms.chat(text)
    print(res)
    if res["tag"] == "noanswer":
        print("invalid")
        if session.get("logged_in"):
            print("logged in")
            if SPAMI(text) == "[False]":
                print("sending to admin")
                ms.add_message(text, session['username'], receiver="admin@example.com")
        else:
            print("logged out")
            message ={"answer" : "I did not understand your message. Please log in so I can send your message to the administrators. Thank you."}
    message = {"answer" : res["answer"]}
    # Return the response
    return jsonify(message)

@api.route('/messages/api', methods=['GET'])
@api.route('/messages/api/<int:id>', methods=['GET'])
def get_message_by_id(id=None):
    messages = ms.get_message(id)
    if not messages:
        return make_response(jsonify({'error': 'Not found'}), 404)

    return jsonify({'messages': messages})

@api.route('/messages/api', methods=['POST'])
def create_message():
    if not request.json or not 'message' in request.json or not 'sender' in request.json:
        return make_response(jsonify({'error': 'Bad request'}), 400)
    id = ms.add_message(request.json['message'], request.json['sender'])
    return get_message_by_id(id), 201

@api.route('/send_reply', methods=['POST'])
def send_reply():
    # Get the message data from the request body
    data = request.get_json()
    email = data.get('email')
    body = data.get('body')
    #message_id = data.get('message_id')
    
    # Call the function to send the reply
    ms.add_message(body, "admin@example.com", receiver=email)

    # Return a JSON response indicating success
    response = {'status': 'ok'}
    return redirect(url_for('site.admin_dashboard'))
    #return jsonify(response)

@api.route('/delete/<int:id>', methods=['POST'])
def delete_message_by_id(id):
    print(request)
    ms.delete_message(id)
    return redirect(url_for('site.admin_dashboard'))
    # return jsonify({'result': True}

@api.post("/seen_message")
def seen_message():
    print("EGEFGEGEG")
    # Initialize a dictionary to keep track of the count of each response category
    message = request.get_json().get("message_id")
    ms.apply_seen_message(message)
    print(message)
    response = {}
    if session.get("logged_in"):
        print("Username: ", session["username"])
        
        notifs = [u.__dict__ for u in Message.query.filter_by(receiver = session['username'])]
        news = [notif for notif in notifs if notif.get('is_new')]
        response = {'length': len(news)}
        print(response)

    else:
        print("BOBO HINAYUPAK TANGA GAGO LETSE PUTA")

    return jsonify(response)