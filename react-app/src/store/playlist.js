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
};

export const CreatePlaylist = (playlist) => async (dispatch) => {
    const { playlist_name } = playlist

    const res = await fetch('/api/playlists/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            playlist_name
        }),
    });

    if (res.ok) {
        const newPlaylist = await res.json()
        dispatch(create(newPlaylist));
        return newPlaylist;
    }
};

export const EditPlaylist = (playlist, id) => async (dispatch) => {
    const { playlist_name } = playlist

    const playlistFetch = await fetch (`/api/playlists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            playlist_name
        }),
    });

    if (playlistFetch.ok) {
        const updatedPlaylist = await playlistFetch.json();
        dispatch(create(updatedPlaylist))
        return updatedPlaylist;
    };
};



const initalState = {};

export default function playlistReducer(state = initalState, action) {
    switch(action.type) {
        case LOAD_PLAYLISTS:
            return {...state, ...action.playlists}
        case DETAILS_PLAYLIST:
            return {...state, ...action.playlist}
        case CREATE_PLAYLIST:
            return { [action.playlist.id]: action.playlist }
        default:
            return state
    }
};
