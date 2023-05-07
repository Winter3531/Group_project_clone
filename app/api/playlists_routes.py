from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.playlist import Playlist, db
from app.forms.playlist_form import PlaylistForm;


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
    form = PlaylistForm()
    owner_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_playlist = Playlist(
            playlist_name = form.data['playlist_name'],
            owner_id = owner_id
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()


# Update a playlist
@playlists_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_playlist(id):
    """
    Query for a playlist based off playlist id and make changes.
    """

    form = PlaylistForm()
    playlist = Playlist.query.get_or_404(id)


    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist.playlist_name = form.data['playlist_name']

        db.session.commit()
        return playlist.to_dict()


# Delete a playlist
@playlists_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deletePlaylist():
    """
    Query for playlist by id and remove from database
    """
    
