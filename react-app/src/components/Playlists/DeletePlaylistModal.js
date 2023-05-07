import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { DeletePlaylist } from "../../store/playlist";
import { useHistory } from "react-router-dom";


const DeletePlaylistModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const playlist = useSelector(state=>state.playlists)

    const handleClick = async () => {
        await dispatch(DeletePlaylist(playlist.id))
        history.push(`/playlists/current`)
        closeModal()
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
