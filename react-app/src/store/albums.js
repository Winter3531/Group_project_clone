const GET_ALBUMS = 'albums/current_user_albums'

export const load = (albums) => ({
    type: GET_ALBUMS,
    albums
})

export const currentUserAlbums = () => async (dispatch) => {
    const res = await fetch('/api/albums/current')
    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
        return albums
    }
}


const initalState = {};

export default function albumReducer(state = initalState, action) {
    switch(action.type) {
        case GET_ALBUMS: {
            console.log(action.albums, 'this is action!!!!!!')
            return {...state, ...action.albums};
        }
        default:
            return state
    }
}
