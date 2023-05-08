const LIKE_ALBUM = 'album/LIKE_ALBUM'
const UNLIKE_ALBUM = 'album/UNLIKE_ALBUM'

const create = (album) => ({
    type: LIKE_ALBUM,
    album
})

const remove = (albumId) => ({
    type: UNLIKE_ALBUM,
    albumId
})

export const likeAlbum = album => async dispatch => {
    const response = await fetch(`/api/albums/${album.id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    });

    if (response.ok) {
        const liked_album = await response.json();
        dispatch(create(liked_album))
        return liked_album
    }
}

export const unLikeAlbum = albumId => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/likes`)
}

// const initialState = {}

// export default function likeReducer(state = initialState, action) {
//     switch (action.type) {
//         case LIKE_ALBUM:
//             return
//     }
// }
