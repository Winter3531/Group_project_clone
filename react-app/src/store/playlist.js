const LOAD_PLAYLISTS = 'playlist/LOAD_PLAYLISTS';
const DETAILS_PLAYLIST = 'playlist/DETAILS_PLAYLIST';
const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST';


const load = (playlists) => ({
    type: LOAD_PLAYLISTS,
    playlists
});

const details = (playlist) => ({
    type: DETAILS_PLAYLIST,
    playlist
});

const create = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist
})


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
};

export const CreatePlaylist = (playlist) => async (dispatch) => {
    const { playlist_name } = playlist

    const res = await fetch('/api/playlists/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playlist_name
        })
    });

    const newPlaylist = await res.json()
    console.log(newPlaylist, 'New Playlist')
    dispatch(create(newPlaylist));
    return newPlaylist;
};

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
