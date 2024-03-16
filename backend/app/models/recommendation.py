from .. import db
from .. import ma

class Recommendation(db.Model):
    __tablename__ = 'recommendation'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(400))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class RecommendationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'user_id')

recommendation_schema = RecommendationSchema()
recommendations_schema = RecommendationSchema(many=True)