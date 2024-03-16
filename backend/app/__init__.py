from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from authlib.integrations.flask_client import OAuth
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
oauth = OAuth()
ma = Marshmallow()
DB_NAME = os.getenv('DB_NAME')

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    oauth.init_app(app)

    from .views import workspace_view
    from .views import auth_view
    from .views import github_view
    from .views import recommendation_view

    app.register_blueprint(workspace_view.bp, url_prefix='/api/workspaces')
    app.register_blueprint(auth_view.auth, url_prefix='/auth')
    app.register_blueprint(github_view.github_auth, url_prefix='/auth')
    app.register_blueprint(recommendation_view.bp, url_prefix='/api/recommendations')

    with app.app_context():
        db.create_all()

    return app

def create_database(app):
    if not os.path.exists('app/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database')