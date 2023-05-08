from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import Song, Like, Album, db
from app.forms.song_form import SongForm


songs_routes = Blueprint('songs', __name__)
# api/songs/

# THIS IS JUST TO VERIFY THE FUNCTIONALITY OF THE LIKES AND DELETES
@songs_routes.route('')
def all_songs():
    songs = Song.query.all()
    print(songs)
    return {song.id: song.song_detail_dict() for song in songs}

# CREATE A SONG
@songs_routes.route('/new', methods=['POST'])
@login_required
def add_song():
    # print(request.json)
    form = SongForm()
    owner_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song(
            song_name = form.data['song_name'],
            song_length = form.data['song_length'],
            song_src = form.data['song_src'],
            album_id = form.data['album_id']
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.song_detail_dict()

    return "Error form did not validate"

# DELETE SONG
@songs_routes.route('/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)

    if song:
        db.session.delete(song)
        db.session.commit()
        return song.to_dict()

    return "Error song not found"


# CREATE A LIKE/ DELETE A LIKE
@songs_routes.route('/<int:song_id>/likes', methods=['GET','POST','DELETE'])
@login_required
def song_likes(song_id):
    # print(id, "Song_id", current_user.get_id(), "user_id")
    user_id = current_user.id
    like_exists = Like.query.filter_by(user_id = user_id, likable_id = song_id, likable_type = 'song').first()

    if request.method == 'GET':
        if like_exists:
            return like_exists.exists_to_dict()
        return f"User {user_id} has not liked this song."

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
