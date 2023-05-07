import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { CreatePlaylist, PlaylistDetailsFetch } from "../../store/playlist";



const PlaylistFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [playlist_name, setPlaylistName] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        if (playlist_name.length < 1) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }, [playlist_name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newPlaylist = {
            playlist_name
        }

        const playlist = await dispatch(CreatePlaylist(newPlaylist)).catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "Playlist name is required";
                setErrors(errorMsg);
            }
        });

        if (playlist) {
            await dispatch(PlaylistDetailsFetch(playlist.id))
            history.push(`/playlists/${playlist.id}`)
            closeModal()
        }
    };

    return (
        <>
            <h1 className="playlist-modal-header">Create a new playlist</h1>
            <form className='playlist-modal-form' onSubmit={handleSubmit}>
                <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                <input
                    type="text"
                    value={playlist_name}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="playlistName"
                    placeholder="Playlist Name"
                />
                <button className="submit" disabled={isButtonDisabled} type='submit'>Create Playlist</button>
            </form>
        </>
    )
}


export default PlaylistFormModal;
