const GET_ALBUMS = 'album/LOAD_ALBUM'
const GETONE_ALBUM = 'album/GETONE_ALBUM'

const load = (albums) => ({
    type: GET_ALBUMS,
    albums
})

const getone = (album) => ({
    type: GETONE_ALBUM,
    album
})

export const currentUserAlbums = () => async (dispatch) => {
    const res = await fetch('/api/albums/current')
    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
        return albums
    }
}

export const getAlbumDetail = (albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`)

    if (response.ok) {
        const album = await response.json();
        dispatch(getone(album));
        return album
    }
}


const initalState = {};

export default function albumReducer(state = initalState, action) {
    switch(action.type) {
        case GET_ALBUMS:
            return {...state, ...action.albums};
        case GETONE_ALBUM:
            console.log(action, 'this is action!!!!!!')
            return {...state, ...action.albums};
        default:
            return state
    }
}
