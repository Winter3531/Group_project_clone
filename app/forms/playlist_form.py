from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PlaylistForm(FlaskForm):
    playlist_name = StringField('Playlist Name', validators=[DataRequired()])
