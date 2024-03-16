from flask import Blueprint, jsonify, session, request, redirect
from ..middleware.require_login import require_login
from ..models.user import User, user_schema
from ..models.recommendation import Recommendation
from ..chat.generate_recommendations import generate_recommendations
from .. import db

auth = Blueprint('auth', __name__)

@auth.route('/logout')
@require_login
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Successfully logged out'})

@auth.route('/fill-info', methods=['PUT'])
@require_login
def fill_info():
    skill_level = request.json['skill_level']
    print(skill_level)
    interest = request.json['interest']
    print(interest)

    # Get the user from the session
    user_id = session.get('user')['id']
    user = User.query.get(user_id)

    # Update user attributes
    user.skill_level = skill_level
    user.interest = interest
    user.filled = True

    recomendations = generate_recommendations(skill_level, interest)
    for rec in recomendations:
        new_rec = Recommendation(
            user_id=user_id,
            content=rec
        )
        db.session.add(new_rec)

    # Commit changes to the database
    db.session.commit()
    session['user'] = user_schema.dump(user)
    # Return updated user information
    return jsonify(user_schema.dump(user))

@auth.route('/current_user')
@require_login
def current_user():
    user = session.get('user')
    return jsonify(user)