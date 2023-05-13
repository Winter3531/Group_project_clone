from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class SongPlaylist(db.Model):
    __tablename__ = 'song_playlist'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)

    playlists = db.relationship('Playlist', back_populates='songs_playlist')

    songs = db.relationship('Song', back_populates='playlists_song')

    def to_dict(self):
        return {
            "id" : self.id,
            "playlist_id" : self.playlist_id,
            "song_id" : self.song_id,
            "song_name": self.songs.song_name,
            "song_length": self.songs.song_length,
            "song_src": self.songs.song_src,
            "playlist_name": self.playlists.playlist_name,
            "songs":[[song.playlist_song_like_dict() for song in self.songs] if self.songs else []] if self.songs else [],
        }

    def player_dict(self):
        return {
            "song_src": self.songs.song_src,
        }
