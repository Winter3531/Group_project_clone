from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Song, Like, Album, db


songs_routes = Blueprint('songs', __name__)

# THIS IS JUST TO VERIFY THE FUNCTIONALITY OF THE LIKES AND DELETES
@songs_routes.route('/likes')
def all_songs():
    songs = Song.query.all()
    print(songs)
    return {song.id: song.to_dict() for song in songs}

# CREATE A LIKE BACKEND
@songs_routes.route('/<int:song_id>/likes', methods=['POST'])
def song_likes(song_id):
    # print(id, "Song_id", current_user.get_id(), "user_id")

    new_like = Like(
        user_id = 1,
        likable_type = 'song',
        likable_id = song_id
    )

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

# DELETE SONG LIKES
@songs_routes.route('<int:song_id>/likes/<int:like_id>', methods=["DELETE"])
def delete_song_like(song_id, like_id):
    remove_like = Like.query.get(like_id)
    print(remove_like)

    db.session.delete(remove_like)
    db.session.commit()

    return remove_like.to_dict()
