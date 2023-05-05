const GET_ALBUMS = 'album/LOAD_ALBUM'
const GETONE_ALBUM = 'album/GETONE_ALBUM'
const CREATE_ALBUM = 'album/CREATE_ALBUM'
const EDIT_ALBUM = 'album/EDIT_ALBUM'
const REMOVE_ALBUM = 'album/REMOVE_ALBUM'

const load = (albums) => ({
    type: GET_ALBUMS,
    albums
})

const getone = (album) => ({
    type: GETONE_ALBUM,
    album
})

const create = (album) => ({
    type: CREATE_ALBUM,
    album
})

const edit = (album) => ({
    type: EDIT_ALBUM,
    album
})

const remove = (albumId) => ({
    type: REMOVE_ALBUM,
    albumId
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

export const createAlbum = (album) => async dispatch => {

    const { album_name, year_recorded, album_img } = album;

    const response = await fetch('/api/albums', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            album_name,
            year_recorded,
            album_img,
        })
    });

    const newAlbum = await response.json()
    dispatch(create(newAlbum));
    return newAlbum;
}

export const editAlbum = (album) => async disptach => {
    const { id, album_name, year_recorded, album_img } = album;

    console.log(album, 'this is album in edit album thunk')
    const response = await fetch(`/api/albums/${album.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id : id,
            album_name,
            year_recorded,
            album_img,
        })
    })

    console.log(response, 'this is response in edit album thunk')
    if (response.ok) {
        const album = await response.json();
        disptach(edit(album))
        return album
    }
};

const initalState = {};

export default function albumReducer(state = initalState, action) {
    switch (action.type) {
        case GET_ALBUMS:
            return { ...state, ...action.albums };
        case GETONE_ALBUM:
            return { [action.album.id]: action.album };
        case CREATE_ALBUM:
            return { [action.album.id]: action.album };
        case EDIT_ALBUM:
            console.log(action, 'this is action!!!!!!!!')
            return { ...state, ...action.albums }
        default:
            return state
    }
}
