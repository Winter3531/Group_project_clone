const ALL_SONGS = 'song/ALL_SONGS';
const ADD_SONG = 'song/ADD_SONG';
const DELETE_SONG = 'song/DELETE_SONG'

export const deleteSong = (songId) => ({
    type: DELETE_SONG,
    songId
})

export const addSong = (songData) => ({
    type: ADD_SONG,
    songData
})

export const allSongs = (songs) => ({
    type: ALL_SONGS,
    songs
});


export const deleteSongThunk = (songId) => async (dispatch) => {
    const response = await fetch(`api/songs/${songId}`, {
        method: 'DELETE'
    })

    if (response.ok){
        dispatch(deleteSong(songId))
        return response.json()
    }
}

export const addNewSongFetch = (songData) => async (dispatch) => {
    const { song_name, song_length, song_src, album_id } = songData
    const response = await fetch(`/api/songs/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        // HAD TO DESTRUCTURE THE INPUTS TO HAVE THEM IN
        // THE PROPER STRUCTURE TO GO TO THE SONG FORM
        body: JSON.stringify({
            song_name,
            song_length,
            song_src,
            album_id
        })
    });
    const newSong = await response.json();
    if (response.ok){
        dispatch(addSong(newSong))
        return newSong
    }
}

export const allSongsFetch = () => async (dispatch) => {
    const response = await fetch(`/api/songs`);

    if (response.ok) {
        const songData = await response.json();
        dispatch(allSongs(songData));
        return songData;
    };
};


const initalState = {};

export default function songReducer(state = initalState, action) {
    switch(action.type) {
        case ALL_SONGS:
            return {...state, ...action.songs}

        case ADD_SONG:
            return {...state, [action.songData.id]: action.songData}

        case DELETE_SONG:
            const removeState = {...state}
            const song = action.songId
            delete removeState[song]
            return removeState

        default:
            return state
    };
};
