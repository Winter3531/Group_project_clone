from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from flask_login import current_user
from .like import Like

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String, nullable=False)
    year_recorded = db.Column(db.Integer, nullable=False)
    album_img = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owners = db.relationship('User', back_populates='albums')

    likes = db.relationship('Like', lazy=True, primaryjoin='and_(Like.likable_type=="album", foreign(Like.likable_id)==Album.id)', back_populates='albums')

    songs = db.relationship('Song', back_populates='albums')

    def to_dict(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'year_recorded': self.year_recorded,
            'album_img': self.album_img,
            'user_id' : current_user.id,
            'likes' :[like.likable_type for like in self.likes] if self.likes else 'No'
        }

    # def liked_album_dict(self):
    #             return {
    #         'id': self.id,
    #         'album_name': self.album_name,
    #         'year_recorded': self.year_recorded,
    #         'album_img': self.album_img,
    #     }
