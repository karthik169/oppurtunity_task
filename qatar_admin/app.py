from flask import Flask, render_template
from flask_login import LoginManager
from qatar_admin.config import Config
from qatar_admin.models import db, Admin

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# ✅ Home route
@app.route('/')
def home():
    return render_template('admin.html')

# ✅ Import routes AFTER app is created
from qatar_admin.routes import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()
