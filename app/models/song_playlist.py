from .db import db, environment, SCHEMA
from sqlalchemy.schema import Table

song_playlist = Table(
    'song_playlist',
    db.Model.metadata,
    db.Column('playlist_id', db.ForeignKey('playlists.id'), primary_key=True),
    db.Column('song_id', db.ForeignKey('songs.id'), primary_key=True)
)
