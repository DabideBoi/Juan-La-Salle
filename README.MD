# BackEnd-Notifications
This branch is now succesfully merged with the 'Tensorflow-Admin--GUI' branch and serves as the latest build of the project.
This branch focuses on the notifications feature of the entire project.  

---

# GUI Upgrade

This branch branches off from a point in the --Admin branch for the purpose of improving the GUI. Worked on by Rafols.

---

# JUAN La Salle Chatbot - Flask | Tensorflow

JUAN La Salle was developed for the sole purpose of helping the De La Salle University - Dasmariñas' Office of the Registrar managing questions and queries. This chatbot should not be used outside its intended use-case. 

---
## Table of Content
- How to Run
- Introduction
- Technologies Used
  - Flask
    - Blueprint
    - Roles Management
    - Messaging
    - Routing
  - SQL Alchemy
    - Models
    - Tables
      - User
      - Messages
      - Conversation
  - Tensorflow
    - FeedForward Neural Network (FFNN)
    - Nadam Optimizer
    - Intents
    - Trained Model Evaluation

---
## Directory

        app
        ├── api
        │   ├── chat.py
        │   ├── nltk_utils.py
        │   └── routes.py
        ├── config.py
        ├── datamodels.py
        ├── extensions.py
        ├── __init__.py
        ├── instance
        │   └── data.db
        ├── ml_files
        │   ├── chatbot_model.h5
        │   ├── classes.pkl
        │   ├── intents.json
        │   └── words.pkl
        ├── nltk_utils.py
        ├── README.MD
        ├── requirements.txt
        ├── run.py
        ├── sites
        │   └── routes.py
        ├── static
        │   ├── app.js
        │   ├── favicon.ico
        │   ├── images
        │   │   ├── chatbox-icon.svg
        │   │   ├── dlsud_logo.png
        │   │   ├── JuanLasalle.png
        │   │   └── Sample_bg.png
        │   └── style.css
        ├── templates
        │   ├── admin.html
        │   ├── base.html
        │   ├── existing_user.html
        │   ├── home.html
        │   ├── login.html
        │   ├── new_user.html
        │   └── register.html
        └── train.py

---
## How to Run
  To run, simply call ``` python run.py dev``` to run on development mode and/or ```python run.py rel```  to run on release mode

## Introduction
  Juan LaSalle is a contextual chatbot for the Universtity Registrar of De La Salle University - Dasmariñas. This chatbot utilizes the use of Feed Forward Neural Network and NLP-Libraries in Python.  

## Technologies Used
- ## Flask
    Flask is a web framework for Python. It is a lightweight and flexible framework that provides useful tools and features for building web applications.

      We used flask for these benefits:
      1. Flask is a lightweight and flexible framework.
      2. Flask provides a simple and easy-to-use interface for creating web applications.
      3. Flask includes a powerful routing system that allows developers to define the URLs for their application and map them to specific functions.
      4. Flask has a large and active community of users and developers, which means that you can easily find help and support if you have questions or encounter problems.

  - ### Flask-Blueprint
      Blueprints allow developers to define a set of routes and views, along with any other functionality, that can be registered on a Flask application. This means that a blueprint can be created in a separate Python module and then imported and registered on the main Flask app.

      When a blueprint is registered on a Flask app, it becomes a "blueprint app" that can define its own routes and views. These routes and views are registered with the Flask app using a prefix, which allows them to be accessed using a specified URL.
      
      There are only 2 blueprints used in this project: Views (or sites) and API.  Views is where the front end routing is found. While the API contains all the requests and logic side of the program, this includes the interaction of the trained model and the user, the login authentication, and roles management (Student and Admin).
  - ### Flask-Blueprint
      Blueprints allow developers to define a set of routes and views, along with any other functionality, that can be registered on a Flask application. This means that a blueprint can be created in a separate Python module and then imported and registered on the main Flask app.

      When a blueprint is registered on a Flask app, it becomes a "blueprint app" that can define its own routes and views. These routes and views are registered with the Flask app using a prefix, which allows them to be accessed using a specified URL.
      
      There are only 2 blueprints used in this project: Views (or sites) and API.  Views is where the front end routing is found. While the API contains all the requests and logic side of the program, this includes the interaction of the trained model and the user, the login authentication, and roles management (Student and Admin).
  - ### Role Management
      The Role Management code did not use any flask extensions, but instead was coded purely of vanilla Python. 

      ```
      # List of routes and the roles that can access them
      route_access = {
          '/chat': ['student', 'admin'],
          '/admin_dashboard': ['admin']
      }

      # Middleware function to check if the user has access to the requested route
      @api.before_request
      def check_user_access():
          if request.path in route_access:
              if not 'username' in session or session['role'] not in route_access[request.path]:
                  return redirect(url_for('site.login'))
      ```
      <sub>You can find this code on api/routes.py</sub>

      This code defines a dictionary called _route_access_ that maps routes to lists of roles that are allowed to access them. The check_user_access function is a middleware function that is run before each request to the API. It checks if the current path of the request is in the _route_access_ dictionary. If it is, the function then checks if the username is in the current session and/or if the role of the user is in the list of allowed roles for the route. If either of these conditions is not met, the user is redirected to the login page.

      This middleware function is used as a role-based access control (RBAC). It allows you to specify which routes are accessible to which user roles, and prevents users who do not have the necessary permissions from accessing certain routes.
  - ### Messaging
      The Messaging portion of the code is still under development

  - ### Routing
      Routings are separated in to two blueprint as stated in the Blueprint portion. One handles the frontend (Views/sites) and one handles the backend (API). Please check the routes files on _api/_ and _sites/_
