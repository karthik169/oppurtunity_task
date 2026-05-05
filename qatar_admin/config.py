import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secretkey123')

    # On Render the project src directory is read-only after deploy.
    # Use /tmp for SQLite on Render (writable), local path for dev.
    _db_path = os.environ.get('DATABASE_PATH', os.path.join('/tmp', 'database.db'))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + _db_path

    SQLALCHEMY_TRACK_MODIFICATIONS = False
