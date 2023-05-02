from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from .user_album import owner_album
from .like import Like

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String, nullable=False)
    year_recorded = db.Column(db.Integer, nullable=False)
    album_img = db.Column(db.String)


    owners = db.relationship('User',
                            secondary=owner_album,
                            back_populates='albums')

    likes = db.relationship('Like', lazy=True, primaryjoin='and_(Like.likable_type=="album", foreign(Like.likable_id)==Album.id)', back_populates='albums')

    songs = db.relationship('Song', back_populates='albums')
