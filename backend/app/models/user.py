from .. import db
from .. import ma

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    provider_id = db.Column(db.String(100), unique=True, nullable=False)
    avatar = db.Column(db.String(1000))
    interest = db.Column(db.String(500))
    skill_level = db.Column(db.String(500))
    filled = db.Column(db.Boolean)

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'provider_id', 'avatar', 'interest', 'skill_level', 'filled')

user_schema = UserSchema()
users_schema = UserSchema(many=True)