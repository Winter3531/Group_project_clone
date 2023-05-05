from flask import Blueprint
from flask_login import login_required
from app.models import Album
# from app.forms import CreateAlbumForm
from flask_login import current_user



albums_routes = Blueprint('albums', __name__)

# Get all albums for the current user.
  # api/albums/current
@albums_routes.route('/current')
# @login_required
def user_albums():
    """
    Query for all albums for the user and returns them in a list of album dictionaries
    """
    albums = Album.query.all()
    return {album.id: album.to_dict() for album in albums}

# Get details of an album by the id.

@albums_routes.route('/<int:id>')
def album_detail(id):

    album = Album.query.get(id)
    return album.to_dict()

# Create an album
# @albums_routes.route('/', method=['POST'])
# def create_album():
#     """
#     create an album
#     """
#     # form = CreateAlbumForm()
#     new_album = Album(
#         album_name = form.data['album_name'],
#         year_recorded = form.data['year_recorded'],
#         album_img = form.data['album_img'],
#         user_id = current_user.id
#     )
#     db.session.add(new_album)

# Update an album

# Delete an album
