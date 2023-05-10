from .db import db, environment, SCHEMA
from .song_playlist import SongPlaylist
from .like import Like


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    times_played = db.Column(db.Integer)
    song_name = db.Column(db.String(255), nullable=False)
    song_length = db.Column(db.Integer, nullable=False)
    song_src = db.Column(db.String, nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=False)

    albums = db.relationship('Album', back_populates='songs')

    playlists_song = db.relationship('SongPlaylist', back_populates='songs')

    likes = db.relationship('Like', lazy=True, primaryjoin='and_(Like.likable_type=="song", foreign(Like.likable_id)==Song.id)', back_populates='songs')



    @property
    def new_song_name(self):
        return self.song_name

    @new_song_name.setter
    def song(self, name):
        self.song_name = name

    def to_dict(self):
        return {
            'id': self.id,
            'songName': self.song_name,
            'likes': [like.to_dict() for like in self.likes] if self.likes else []
        }

    def song_detail_dict(self):
        return {
            'id': self.id,
            'song_name': self.song_name,
            'song_length': self.song_length,
            'song_src': self.song_src,
            'album_id': self.album_id
        }

    def song_like_dict(self):
        return {
            'id': self.id,
            'song_name': self.song_name,
            'song_length': self.song_length,
            'song_src': self.song_src,
            'album_id': self.album_id,
            'likes': [like.to_dict() for like in self.likes] if self.likes else []
        }


    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'songName': self.song_name,
    #         'like_ids': [like.id for like in self.likes] if self.likes else []
    #     }
