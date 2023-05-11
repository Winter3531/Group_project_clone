import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { DeletePlaylist, currentUserPlaylists } from "../../store/playlist";
import { useHistory } from "react-router-dom";


const DeletePlaylistModal = ({playlistId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(DeletePlaylist(playlistId));
        // await dispatch(currentUserPlaylists());
        history.push('/playlists/current');
        closeModal();
    }

    return (
        <>
            <h1 className="playlist-modal-header">Are you sure you want to delete your playlist?</h1>
            <button className="yes" onClick={handleClick}>Delete</button>
            <button className="no" onClick={closeModal}>Cancel</button>
        </>
    )
}


export default DeletePlaylistModal
