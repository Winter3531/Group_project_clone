from .db import db, environment, SCHEMA



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    likable_type = db.Column(db.Enum('user','album','playlist','song', name='likable_tpye'), nullable=False)
    likable_id = db.Column(db.Integer, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'likes',
        'with_polymorphic': '*',
        "polymorphic_on": likable_type
    }

    users = db.relationship('User', back_populates='user_likes')

    albums = db.relationship('Album', back_populates='likes')

    playlists = db.relationship('Playlist', back_populates='likes')

    songs = db.relationship('Song', back_populates='likes')
