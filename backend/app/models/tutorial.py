from .. import db
from .. import ma

class Tutorial(db.Model):
    __tablename__ = 'tutorial'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(500))
    url = db.Column(db.String(1000))
    instructor = db.Column(db.String(100))
    img = db.Column(db.String(1000))
    price = db.Column(db.String(100))
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspace.id'))

class TutorialSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'url', 'instructor', 'img', 'price', 'workspace_id')

tutorial_schema = TutorialSchema()
tutorials_schema = TutorialSchema(many=True)


