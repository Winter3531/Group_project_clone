from .db import db, environment, SCHEMA



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    likeable_type = db.Column(db.Enum('user','album','playlist','song'), defaultValue='None', nullable=False)
    likeable_id = db.Column(db.Integer, nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'likes',
        'with_polymorphic': '*',
        "polymorphic_on": type
    }

    user = db.relationship('User', back_populate='likes', cascade='all, delete-orphan')
