from .db import db, environment, SCHEMA
from .song_playlist import song_playlist
from .like import Like


class Song(db.Model, Like):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    times_played = db.Column(db.Integer)
    song_name = db.Column(db.String(255), nullable=False)
    song_length = db.Column(db.Integer, nullalbe=False)
    song_src = db.Column(db.String, nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'songs',
        'with_polymorphic': '*'
    }

    album = db.relationship('Album', back_populates='songs')

    playlists = db.relationship('Playlist',
                                secondary=song_playlist,
                                back_populates='songs'
                                )



    @property
    def new_song_name(self):
        return self.song_name

    @new_song_name.setter
    def song(self, name):
        self.song_name = name