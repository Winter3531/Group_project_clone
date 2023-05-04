from .albums import album_1, album_2, album_3
from .users import demo, marnie, bobbie
from app.models import db, environment, SCHEMA

def seed_users_albums():
    album_1.owners.append(demo)
    album_2.owners.append(marnie)
    album_2.owners.append(bobbie)
    album_3.owners.append(demo)
    db.session.commit()

def undo_users_albums():
    db.drop_all()
