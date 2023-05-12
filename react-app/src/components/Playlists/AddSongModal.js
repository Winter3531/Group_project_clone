import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";

const AddSongModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handleSelectChange = (e) => {
        e.preventDefault();

        setSelectedPlaylist(e.target.value);
        setTimeout(() => {
            closeModal()
        }, 2000);
    }


    return (
        <>
            <h1 className="playlist-modal-header">Which playlist would you like to add to?</h1>
            {!selectedPlaylist && (
                <div>
                    <label htmlFor="mySelect">Select a playlist:</label>
                    <select id='mySelect' value={selectedPlaylist} onChange={handleSelectChange}>
                        <option value=''>-- Select --</option>
                        <option value='playlist1'>Playlist 1</option>
                    </select>
                </div>
            )}
                {selectedPlaylist && (
                    <p>{selectedPlaylist} has been chosen</p>
                )}
        </>
    )
}

export default AddSongModal
