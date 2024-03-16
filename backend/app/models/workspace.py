from .. import db
from .. import ma

class Workspace(db.Model):
    __tablename__ = 'workspace'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    prompt = db.Column(db.String(100))

class WorkspaceSchema(ma.Schema):
    class Meta:
        fields = ('id','user_id', 'name', 'prompt')

workspace_schema = WorkspaceSchema()
workspaces_schema = WorkspaceSchema(many=True)