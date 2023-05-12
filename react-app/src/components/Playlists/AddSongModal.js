import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { currentUserPlaylists, AddSongFetch } from "../../store/playlist";

const AddSongModal = ({songId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [selectedPlaylist, setSelectedPlaylist] = useState(0);
    const playlists = useSelector(state=>state?.playlists);
    const sessionUser = useSelector(state=>state.session.user);


    useEffect(() => {
        dispatch(currentUserPlaylists())
    }, [dispatch])


    const handleSelectChange = async (e) => {
        e.preventDefault();

        setSelectedPlaylist(e.target.value)
        const playlistId = e.target.value
        await dispatch(AddSongFetch(playlistId, songId))
        setTimeout(() => {
            closeModal()
        }, 2000);
    }


    return (
        <>
            {!selectedPlaylist &&(
                <>
                    <h1 className="playlist-modal-header">Which playlist would you like to add to?</h1>
                    {playlists ? (
                            <div>
                                <label htmlFor="mySelect">Select a playlist:</label>
                                <select id='mySelect' value={selectedPlaylist} onChange={handleSelectChange}>
                                    <option value=''>-- Select --</option>
                                    {Object.values(playlists).map(playlist => {
                                        const songs = playlist?.songs.map(song => song.song_id);
                                        const isSongAdded = songs.includes(songId);

                                        if (!isSongAdded) {
                                            return (
                                                <option key={playlist.id} value={playlist.id}>
                                                    {playlist.playlist_name}
                                                </option>
                                            );
                                        }
                                        return null;
                                    })}
                                </select>
                            </div>
                        ) : 'You have no playlists to add to'}
                        {selectedPlaylist && (
                            <p>{selectedPlaylist} has been chosen</p>
                        )}
                    </>
                )}
        </>
    )
}

export default AddSongModal
