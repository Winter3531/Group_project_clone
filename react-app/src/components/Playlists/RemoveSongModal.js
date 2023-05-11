import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { PlaylistDetailsFetch, RemoveSong } from "../../store/playlist";


const RemoveSongModal = ({songId, playlistId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const playlist = useSelector(state=>state.playlists[playlistId])


    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(RemoveSong(playlist.id, songId));
        await dispatch(PlaylistDetailsFetch(playlist.id));
        closeModal();
    }

    return (
        <>
            <h1 className="playlist-modal-header">Are you sure you want to remove this song?</h1>
            <button className="yes" onClick={handleClick}>Yes</button>
            <button className="no" onClick={closeModal}>Cancel</button>
        </>
    )
}

export default RemoveSongModal
