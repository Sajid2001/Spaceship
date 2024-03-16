from flask import Blueprint, request, session
from .. import db
from ..models.workspace import Workspace, workspace_schema, workspaces_schema
from ..models.tutorial import Tutorial, tutorial_schema, tutorials_schema
from ..models.task import Task, task_schema, tasks_schema
from ..chat.tutorial_retrieval import run_executor
from ..chat.task_generation import generate_tasks

bp = Blueprint('workspace', __name__)


@bp.route('/', methods=['GET', 'POST'])
def workspaces():
    user_id = session['user']['id']
    if request.method == 'POST':
        prompt = request.json['prompt']
        tutorials_dict = run_executor(prompt)
        #print(tutorials_dict['tutorials'])
        workspace = Workspace(prompt=prompt, user_id=user_id)
        db.session.add(workspace)
        db.session.commit()

        #in the future move this to a background process
        for tutorial in tutorials_dict['tutorials']:
            print(tutorial)
            new_tutorial = Tutorial(
                name=tutorial['name'],
                description=tutorial['description'],
                url=tutorial['url'],
                instructor=tutorial['instructor'],
                img=tutorial['img'],
                price=tutorial['price'],
                workspace_id=workspace.id
            )
            #print(tutorial_schema.jsonify(new_tutorial))
            db.session.add(new_tutorial)
        task_list = generate_tasks(prompt)
        print(task_list)
        for task in task_list:
            print(task)
            new_task = Task(
                content=task,
                workspace_id=workspace.id
            )
            db.session.add(new_task)

        db.session.commit()
        return workspace_schema.jsonify(workspace)
    
    workspaces = Workspace.query.filter_by(user_id=user_id).all()
    result = workspaces_schema.dump(workspaces)
    return result

@bp.route('/<id>', methods=['GET'])
def workspace(id):
    workspace = Workspace.query.filter_by(id=id).first()
    result = workspace_schema.dump(workspace)
    return result

@bp.route('/<id>/tutorials', methods=['GET'])
def tutorials(id):
    tutorials = Tutorial.query.filter_by(workspace_id=id).all()
    result = tutorials_schema.dump(tutorials)
    return result


@bp.route('/<id>/tasks', methods=['GET'])
def tasks(id):
    tasks = Task.query.filter_by(workspace_id=id).all()
    print(tasks)
    result = tasks_schema.dump(tasks)
    print(result)
    return result