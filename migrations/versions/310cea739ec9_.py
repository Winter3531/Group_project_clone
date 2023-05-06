"""empty message

Revision ID: 310cea739ec9
Revises: bef0ec7b73fd
Create Date: 2023-05-03 21:27:19.718718

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '310cea739ec9'
down_revision = 'bef0ec7b73fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('owner_album')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('owner_album',
    sa.Column('album_id', sa.INTEGER(), nullable=False),
    sa.Column('owner_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('album_id', 'owner_id')
    )
    # ### end Alembic commands ###
