from .db import db, environment, SCHEMA
from .song_playlist import song_playlist
from .like import Like

class Playlist(db.Model, Like):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullablue=False)

    __mapper_args__ = {
        'polymorphic_identity': 'playlists',
        'with_polymorphic': '*'
    }

    owner = db.relationship('User', back_populates='playlists')

    songs = db.relationship('Song',
                            secondary=song_playlist,
                            back_populates='playlists')
