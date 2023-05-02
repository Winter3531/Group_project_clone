from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from .user_album import owner_album
from .like import Like

class Album(db.Model, Like):
    __table__ = 'albums'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String, nullable=False)
    year_recorded = db.Column(db.Integer, nullable=False)
    album_img = db.Column(db.String)

    __mapper_args__ = {
        'polymorphic_identity': 'albums',
        'with_polymorphic': '*'
    }

    owners = db.relationship('User',
                            secondary=owner_album,
                            back_populates='users')
