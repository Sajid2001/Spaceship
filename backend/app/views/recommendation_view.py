from flask import Blueprint, jsonify, request, session
from ..models.recommendation import Recommendation, recommendations_schema
from .. import db
from ..middleware.require_login import require_login

bp = Blueprint('recommendation', __name__)


@bp.route('/', methods=['GET'])
@require_login
def recommendations():
    user_id = session['user']['id']
    recommendations = Recommendation.query.filter_by(user_id=user_id).all()
    result = recommendations_schema.dump(recommendations)
    return result