from flask import request, jsonify
from qatar_admin.app import app
from qatar_admin.models import db, Admin, Opportunity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, current_user

# ---------------- SIGNUP ----------------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "All fields required"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 chars"}), 400

    if Admin.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = generate_password_hash(password)

    new_user = Admin(full_name=name, email=email, password_hash=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201


# ---------------- LOGIN ----------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = Admin.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    login_user(user)

    return jsonify({"message": "Login successful"}), 200


# ---------------- ADD OPPORTUNITY ----------------
@app.route('/opportunities', methods=['POST'])
@login_required
def add_opportunity():
    data = request.get_json()

    new_op = Opportunity(
        title=data.get('title'),
        duration=data.get('duration'),
        start_date=data.get('start_date'),
        description=data.get('description'),
        skills=data.get('skills'),
        category=data.get('category'),
        future_opportunities=data.get('future_opportunities'),
        max_applicants=data.get('max_applicants'),
        admin_id=current_user.id
    )

    db.session.add(new_op)
    db.session.commit()

    return jsonify({"message": "Opportunity added"}), 201


# ---------------- GET OPPORTUNITIES ----------------
@app.route('/opportunities', methods=['GET'])
@login_required
def get_opportunities():
    ops = Opportunity.query.filter_by(admin_id=current_user.id).all()

    result = []
    for op in ops:
        result.append({
            "id": op.id,
            "title": op.title,
            "category": op.category,
            "duration": op.duration,
            "start_date": op.start_date,
            "description": op.description,
            "skills": op.skills,
            "future_opportunities": op.future_opportunities,
            "max_applicants": op.max_applicants
        })

    return jsonify(result)



# ---------------- UPDATE ----------------
@app.route('/opportunities/<int:id>', methods=['PUT'])
@login_required
def update_opportunity(id):
    data = request.get_json()
    op = Opportunity.query.get(id)

    if not op or op.admin_id != current_user.id:
        return jsonify({"error": "Not allowed"}), 403

    op.title = data.get('title')
    op.duration = data.get('duration')
    op.start_date = data.get('start_date')
    op.description = data.get('description')
    op.skills = data.get('skills')
    op.category = data.get('category')
    op.future_opportunities = data.get('future_opportunities')
    op.max_applicants = data.get('max_applicants')

    db.session.commit()

    return jsonify({"message": "Updated successfully"})


# ---------------- DELETE ----------------
@app.route('/opportunities/<int:id>', methods=['DELETE'])
@login_required
def delete_opportunity(id):
    op = Opportunity.query.get(id)

    if not op or op.admin_id != current_user.id:
        return jsonify({"error": "Not allowed"}), 403

    db.session.delete(op)
    db.session.commit()

    return jsonify({"message": "Deleted successfully"})
