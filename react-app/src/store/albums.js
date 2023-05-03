const GET_ALBUMS = 'albums/current_user_albums'

const getUserAlbums = (albums) => ({
    type: GET_ALBUMS,
    payload: albums
})

export const currentUserAlbums = () => async (dispatch) => {
    const res = await Fetch('/api/albums/current')
    if (res.ok) {
        const albums = await res.json().then((data) => dispatch(getUserAlbums(data)))

        return albums
    }



const initalState = {};

export default function albumReducer(state = initalState, action) {
    switch(action.type) {
        case GET_ALBUMS: {
            const newState = {};
            action.albums.Albums.forEach((album) => (newState[spot.id] = album))
            return newState;
        }
        default:
            return state
    }
}
