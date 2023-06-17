from flask import Blueprint, Flask, render_template, request, redirect, url_for, session, jsonify
import api.messaging as ms
from datamodels import User, Message
from extensions import db
from functools import wraps, partial

site = Blueprint("site", __name__)

# def permission_required(status=None):
#     def login_decorator(func):
#         @wraps(func)
#         def wrapper(*args, **kwargs):
#             if 'username' in session and (status is None or status in session):
#                 return func(*args, **kwargs)
#             else:
#                 return redirect("/unauthorized")
#         return wrapper
#     return login_decorator

def get_current_user():
    return session


def permission_required(endpoint=None, needs_admin=False):
    if endpoint is None:
        return partial(permission_required, needs_admin=needs_admin)

    @wraps(endpoint)
    def wrapper(*args, **kwargs):
        if "username" not in session:
            return redirect(url_for('site.index'))
        elif needs_admin and get_current_user()["role"] != "admin":
            return "Not an admin!", 403
        else:
            return endpoint(*args, **kwargs)
    return wrapper

@site.route('/')
def index():
    try:
        if session['logged_in'] == True:
            return redirect("/home")
    except:
        return render_template('login.html')

@site.route('/logout')
@permission_required
def logout():
    # remove the user's username from the session data
    session.pop('username', None)
    session.pop('role', None)
    session.pop('logged_in', None)
    # redirect to the login page
    return redirect("/")

@site.route('/register')
def register():
    return render_template('register.html')

@site.route('/home')
@permission_required
def home():
    if session["role"] == 'admin':
        return render_template('home_admin.html')
    return render_template('home_student.html')


@site.route('/chat')
@permission_required()
def chat():
    notifs = [u.__dict__ for u in Message.query.filter_by(receiver=session['username'])]
    news = [notif for notif in notifs if notif.get('is_new')]
    print(notifs)
    if session["role"] == 'admin':
        return render_template('chat_admin.html', notif_list=notifs, news=len(news))
    return render_template('chat_student.html', notif_list=notifs, news=len(news))

@site.route('/admin_dashboard')
# @logged_in
@permission_required(needs_admin=True)
def admin_dashboard():
    messages = ms.get_message()
    messages = [msg for msg in messages if msg['receiver'] == "admin@example.com"]
    messages.reverse()
    return render_template('admin.html', messages=messages)

