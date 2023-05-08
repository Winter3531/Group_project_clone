from flask import Blueprint, request
from flask_login import login_required
from app.models import Album, db, Like
from app.forms.album_form import CreateAlbumForm
from flask_login import current_user
from app.models.user import User, db
from flask import json, jsonify


albums_routes = Blueprint('albums', __name__)

# Get all playlist for the current user.

@albums_routes.route('/current')
@login_required
def user_albums():
    """
    Query for all albums for the user and returns them in a list of album dictionaries
    """
    user_id = current_user.id
    albums = Album.query.filter_by(user_id=user_id)
    return {album.id: album.to_dict() for album in albums}

# GET ALL ALBUMS THAT CURRENT USER LIKES
@albums_routes.route('/likes')
def user_liked_albums():
    user_id = current_user.id
    liked_albums = Like.query.filter_by(user_id = user_id, likable_type='album').all()

    album_display = []
    if liked_albums:
        for like in liked_albums:
            id = like.likable_id
            album = Album.query.get(id)
            album_display.append(album.liked_album_dict())

    return album_display

# Get details of an album by the id.
@albums_routes.route('/<int:id>')
def album_detail(id):

    album = Album.query.get(id)
    if album:
        return album.to_like()
    return "Album does not exsit"


# Create an album
@albums_routes.route('', methods=['POST'])
@login_required
def create_album():
    """
    create an album
    """
    form = CreateAlbumForm()
    user_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # new_album = Album(**request.json)
        new_album = Album(
            album_name=form.data['album_name'],
            year_recorded=form.data['year_recorded'],
            album_img=form.data['album_img'],
            user_id=user_id
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()


# Update an album
@albums_routes.route('/<int:id>/', methods=["PUT"])
@login_required
def edit_album(id):
    """
    edit an album
    """
    user_id = current_user.get_id()

    form = CreateAlbumForm()
    album = Album.query.get_or_404(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # edited_album = Album(**request.json)

        album_name = form.data['album_name']
        year_recorded = form.data['year_recorded']
        album_img = form.data['album_img']

        album.album_name = album_name
        album.year_recorded = year_recorded
        album.album_img = album_img

        db.session.commit()
        return album.to_dict()

# Delete an album
@albums_routes.route('/<int:id>/', methods=['DELETE'])
def delete_album(id):
    album = Album.query.get(id)
    print(album)
    db.session.delete(album)
    db.session.commit()

    return album.to_dict()

# Like an album
@albums_routes.route('/<int:id>/likes', methods=['GET','POST'])
@login_required
def like_album(id):
    user_id = current_user.get_id()
    albums = Album.query.select_from(Like).filter(Like.likable_type == 'album', Like.likable_id == id).first()
    # return {album.id: album.to_dict() for album in albums}
    if albums and request.method == 'POST':
        return albums.to_dict()
    elif albums and request.method == 'GET':
        return albums.to_dict()


    liked_album = Like(
        user_id=user_id,
        likable_type='album',
        likable_id=id
    )
    db.session.add(liked_album)
    db.session.commit()
    return liked_album.to_dict()


# Delete a liked ablum
@albums_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def delete_like_album(id):
    liked_album = Like.query.select_from(Album).filter(Album.id == id, Like.likable_type =='album', Like.likable_id == id).first()
    if liked_album:
        db.session.delete(liked_album)
        db.session.commit()
        return user_liked_albums()
    return user_liked_albums()

# Album name search
@albums_routes.route('/search', methods=['PUT'])
def search():
    data = request.json['input']
    albums = Album.queryfilter(Album.album_name.like(f'%{data}%')).all()
    return {'albums': [album.to_dict() for album in albums]}
