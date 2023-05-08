# from app.models import db, environment, song_playlist, SCHEMA
# from sqlalchemy.sql import text

# songs_playlist_1 = song_playlist(
#     playlist_id = 1,
#     song_id = 1
# )

# songs_playlist_2 = song_playlist(
#     playlist_id = 2,
#     song_id = 3
# )

# songs_playlist_3 = song_playlist(
#     playlist_id = 3,
#     song_id = 2
# )


# def seed_songs_playlist():
#     db.session.add(songs_playlist_1)
#     db.session.add(songs_playlist_2)
#     db.session.add(songs_playlist_3)
#     db.session.commit()

# def undo_songs_playlist():

#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE #?? ;")
#     else:
#         db.session.delete(songs_playlist_1)
#         db.session.delete(songs_playlist_2)
#         db.session.delete(songs_playlist_3)
#         db.session.execute(text("DELETE FROM songs_playlist"))

#     db.session.commit()
