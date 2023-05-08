const ALL_SONGS = 'song/ALL_SONGS';

const allSongs = (songs) => ({
    type: ALL_SONGS,
    songs
});


export const allSongsFetch = () => async (dispatch) => {
    const response = await fetch(`/api/songs`);

    if (response.ok) {
        const songData = await response.json();
        console.log(songData)
        dispatch(allSongs(songData));
        return songData;
    };
};


const initalState = {};

export default function songReducer(state = initalState, action) {
    switch(action.type) {
        case ALL_SONGS:
            return {...state, ...action.songs}
        default:
            return state
    };
};
