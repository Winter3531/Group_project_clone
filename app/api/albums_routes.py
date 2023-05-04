from flask import Blueprint
from flask_login import login_required
from app.models import Album


albums_routes = Blueprint('albums', __name__)

# Get all playlist for the current user.
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
    print(album, "thi is album!!!!!!!!!!!!!!")
    return album.to_dict()

# Create an album

# Update an album

# Delete an album
