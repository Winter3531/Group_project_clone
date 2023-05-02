from .db import db, environment, SCHEMA
from sqlalchemy.schema import Table

owner_album = Table(
    'owner_album',
    db.Model.metadata,
    db.Column('album_id', db.ForeignKey('album.id'), primary_key=True),
    db.Column('owner_id', db.ForeignKey('user.id'), primary_key=True)
)
