from .db import db, environment, SCHEMA



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    likable_type = db.Column(db.Enum('user','album','playlist','song', name='likable_type'), nullable=False)
    likable_id = db.Column(db.Integer, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'likes',
        'with_polymorphic': '*',
        "polymorphic_on": likable_type
    }

    users = db.relationship('User', back_populates='user_likes')

    albums = db.relationship('Album', primaryjoin='and_(Like.likable_type=="album", foreign(Like.likable_id)==Album.id)')

    playlists = db.relationship('Playlist', primaryjoin='and_(Like.likable_type=="playlist", foreign(Like.likable_id)==Playlist.id)')

    songs = db.relationship('Song', primaryjoin='and_(Like.likable_type=="song", foreign(Like.likable_id)==Song.id)')

    user_follow = db.relationship('User', primaryjoin='and_(Like.likable_type=="user", foreign(Like.likable_id)==User.id)')
