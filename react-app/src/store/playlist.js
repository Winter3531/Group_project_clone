const LOAD_PLAYLISTS = 'playlist/LOAD_PLAYLISTS';
const DETAILS_PLAYLIST = 'playlist/DETAILS_PLAYLIST'


const load = (playlists) => ({
    type: LOAD_PLAYLISTS,
    playlists
});

const details = (playlist) => ({
    type: DETAILS_PLAYLIST,
    playlist
});



export const currentUserPlaylists = () => async (dispatch) => {
    const res = await fetch('/api/playlists/current');

    if (res.ok) {
        const playlists = await res.json();
        dispatch(load(playlists));
        return playlists;
    };
};


export const PlaylistDetailsFetch = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`);

    if (res.ok) {
        const playlist = await res.json();
        dispatch(details(playlist));
        return playlist;
    };
}



const initalState = {};

export default function playlistReducer(state = initalState, action) {
    switch(action.type) {
        case LOAD_PLAYLISTS:
            return {...state, ...action.playlists}
        case DETAILS_PLAYLIST:
            return {...state, ...action.playlist}
        default:
            return state
    }
};
