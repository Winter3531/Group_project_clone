from .db import db, environment, SCHEMA
from sqlalchemy.schema import ForeignKey


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    times_played = db.Column(db.Integer)
    song_name = db.Column(db.String(255), nullable=False)
    song_length = db.Column(db.Integer, nullalbe=False)
    song_src = db.Column(db.String, nullable=False)
    album_id = db.Column(db.Integer, ForeignKey("albums.id"))

    @property
    def new_song_name(self):
        return self.song_name

    @new_song_name.setter
    def song(self, name):
        self.song_name = name
