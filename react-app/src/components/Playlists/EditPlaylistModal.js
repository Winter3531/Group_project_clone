import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { EditPlaylist, PlaylistDetailsFetch } from "../../store/playlist";

const EditPlaylistModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const playlist = useSelector(state=>state.playlists);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const playlistId = playlist.id

    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    const [playlist_name, setPlaylistName] = useState(playlist.playlist_name);

    useEffect(() => {
        if (playlist_name.length > 1) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [playlist_name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const editPlaylist = {
            playlist_name
        }

        const updatedPlaylist = await dispatch(EditPlaylist(editPlaylist, playlistId)).catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Playlist name is required";
                setErrors(errorMsg);
            }
        });

        if (updatedPlaylist) {
            console.log(updatedPlaylist)
            await dispatch(PlaylistDetailsFetch(playlistId))
            history.push(`/playlists/${playlistId}`)
            closeModal()
        }
    };

    return (
        <>
            <h1 className="playlist-modal-header">Edit your playlist</h1>
            <form className='playlist-modal-form' onSubmit={handleSubmit}>
                <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                <input
                    type="text"
                    value={playlist_name}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="playlistName"
                    placeholder="Playlist Name"
                />
                <button className="submit" disabled={isButtonDisabled} type='submit'>Edit</button>
            </form>
        </>
    )
}


export default EditPlaylistModal
