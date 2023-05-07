from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Song, Like, Album, db


songs_routes = Blueprint('songs', __name__)
# api/songs/

# THIS IS JUST TO VERIFY THE FUNCTIONALITY OF THE LIKES AND DELETES
@songs_routes.route('')
def all_songs():
    songs = Song.query.all()
    print(songs)
    return {song.id: song.song_detail_dict() for song in songs}

# ADD OR REMOVE


# CREATE A LIKE/ DELETE A LIKE
@songs_routes.route('/<int:song_id>/likes', methods=['POST','DELETE'])
@login_required
def song_likes(song_id):
    # print(id, "Song_id", current_user.get_id(), "user_id")
    user_id = current_user.id
    like_exists = Like.query.filter_by(user_id = user_id, likable_id = song_id, likable_type = 'song').first()

    if request.method == 'DELETE':
        if like_exists:
            db.session.delete(like_exists)
            db.session.commit()
            return f"User {user_id}'s song like has been removed."
        return f"User {user_id} has not liked this song."

    if like_exists:
        return like_exists.exists_to_dict()

    new_like = Like(
        user_id = user_id,
        likable_type = 'song',
        likable_id = song_id
    )

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()
