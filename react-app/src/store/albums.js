const GET_ALBUMS = 'albums/current_user_albums'

export const getUserAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums
})

export const currentUserAlbums = () => async (dispatch) => {
    const res = await fetch('/api/albums/current')
    console.log('res here', res.json())
    if (res.ok) {
        const albums = await res.json().then((data) => dispatch(getUserAlbums(data)))
        return albums
    }
}


const initalState = {};

export default function albumReducer(state = initalState, action) {
    switch(action.type) {
        case GET_ALBUMS: {
            const newState = {};
            console.log("HERE IS THE ACTION", action)
            action.albums.Albums.forEach((album) => (newState[album.id] = album))
            return newState;
        }
        default:
            return state
    }
}
