from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Song, Like


songs_routes = Blueprint('songs', __name__)

@songs_routes.route('/')
def all_songs():
    songs = Song.query.all()
    print(songs)
    return f'<p> {songs} </p>'

@songs_routes.route('/<int:id>/likes')
def song_likes(id):
    print(id, "This PRINTED")
    return {'id': id}
