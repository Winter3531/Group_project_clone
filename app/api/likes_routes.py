from flask import Blueprint, request
from flask_login import login_required
from app.models import Album, db, Like
from flask_login import current_user

likes_routes = Blueprint('likes', __name__)

@likes_routes.route('/')
def liked_album():
    user_id = current_user.get_id()
    likes = Like.query.select_from(Album).filter(Like.likable_type == 'album', Like.user_id == user_id).all()
    return {like.id: like.to_album() for like in likes}
