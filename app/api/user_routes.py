from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Like
from flask_login import current_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/likes')
def user_liked_users():
    user_id = current_user.id
    liked_users = Like.query.filter_by(user_id = user_id, likable_type='user').all()

    user_display = []
    if liked_users:
        for like in liked_users:
            id = like.likable_id
            print("Like ID", like.likable_id)
            print("User ID", like.user_id)
            print("")
            user = User.query.get(id)
            user_display.append(user.to_dict())

    return user_display
