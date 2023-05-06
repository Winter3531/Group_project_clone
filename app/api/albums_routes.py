from flask import Blueprint, request
from flask_login import login_required
from app.models import Album, db
from app.forms.album_form import CreateAlbumForm
from flask_login import current_user
from app.models.user import User, db


albums_routes = Blueprint('albums', __name__)

# Get all playlist for the current user.
  # api/albums/current
@albums_routes.route('/current')
# @login_required
def user_albums():
    """
    Query for all albums for the user and returns them in a list of album dictionaries
    """
    user_id = current_user.id
    albums = Album.query.filter_by(user_id = user_id)
    return {album.id: album.to_dict() for album in albums}

# Get details of an album by the id.

@albums_routes.route('/<int:id>')
def album_detail(id):

    album = Album.query.get(id)
    return album.to_dict()

# Create an album

@albums_routes.route('', methods=['POST'])
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
        album_name = form.data['album_name'],
        year_recorded = form.data['year_recorded'],
        album_img = form.data['album_img'],
        user_id = user_id
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()

# Update an album

@albums_routes.route('/<int:id>/', methods=["PUT"])
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
@albums_routes.route('/<int:id>/likes')
def like_album(id):
    album = Album.query.get(id)
    return album.to_dict()
