from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

# Add few songs
def seed_songs():
    song_1 = Song(
        song_name='Kool aid and frozen pizza',
        song_length= 157,
        song_src='song_url here',
        album_id = 1
    )

    song_2 = Song(
        song_name='Give me back my wig',
        song_length=214,
        song_src='song_url here 2',
        album_id= 2
    )

    song_3 = Song(
        song_name='Wait',
        song_length=192,
        song_src='song_url here 3',
        album_id= 3
    )

    db.session.add(song_1)
    db.session.add(song_2)
    db.session.add(song_3)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE #?? ;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
