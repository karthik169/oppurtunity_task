from flask import Flask, render_template
from qatar_admin.config import Config
from models import db
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

from models import Admin

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# 🔥 ADD ROUTE HERE (after app is created)
@app.route('/')
def home():
    return render_template('admin.html')

from routes import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
