from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Playlist
# from app.forms import PlaylistForm


playlists_routes = Blueprint('playlists', __name__)

# Get all playlist for the current user.
@playlists_routes.route('/current')
@login_required
def user_playlist():
    """
    Queries for all playlist for the user and returns them in a list of playlists dictionaries
    """
    user_id = current_user.id
    playlists = Playlist.query.filter_by(owner_id = user_id)
    return {playlist.id: playlist.to_dict() for playlist in playlists}


# Get details of a playlist by the id
@playlists_routes.route('/<int:id>')
def playlist_details(id):
    """
    Queries for a playlist using the id and returns the detials in a dictionary.
    """
    playlist = Playlist.query.get(id)
    return playlist.to_dict()

# Create a playlist
@playlists_routes.route('/new', methods=['POST'])
def create_playlist():
    """
    Creates a new playlist and redirects them to the playlist details
    """
    # form = PlaylistForm()



# Update a playlist
# @playlists_routes.route('/edit')

# Delete a playlist
# @playlists_routes.route('/delete')
