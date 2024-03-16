from .. import db
from .. import ma

class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(400))
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspace.id'))

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'workspace_id')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)