import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { addNewSongFetch } from "../../store/song";



export default function SongAddModal(){
    const dispatch = useDispatch();
    const [song_name, setSongName] = useState('')
    const [song_src, setSongSrc] = useState('')
    const [song_length, setSongLength] = useState('')
    const [album_id, setAlbumId] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [errors, setErrors] = useState([])
    const {closeModal} = useModal();

    const newSongData = {
        song_name,
        song_src,
        song_length,
        album_id
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ADD VALIDATIONS HERE USING STATE AND AN ERRORS ARRAY
        const validationErrors = []
        if (!song_name) validationErrors.push(['Song name is required.'])
        if (!song_src) validationErrors.push(['Song source is required.'])
        if (!song_length) validationErrors.push(['Song length in seconds is required.'])
        if (!album_id) validationErrors.push(['Album ID is temporarily required.'])
        if (validationErrors.length) return setErrors(validationErrors)

        setErrors([])
        dispatch(addNewSongFetch(newSongData))
        return closeModal()
    }

    return (
        <>
            <h1 className="new-song-modal-header">Add New Song</h1>
            <form className="new-song-modal-form" onSubmit={handleSubmit} >
                <input
                    type="text"
                    value={song_name}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder='Song Name'
                />
                <input
                    type="text"
                    value={song_src}
                    onChange={(e) => setSongSrc(e.target.value)}
                    placeholder='Song Source'
                />
                <input
                    type="integer"
                    value={song_length}
                    onChange={(e) => setSongLength(e.target.value)}
                    placeholder='Song Length in Seconds'
                />
                <input
                    type="integer"
                    value={album_id}
                    onChange={(e) => setAlbumId(e.target.value)}
                    placeholder='Album ID'
                />
                <button
                    type="submit"
                    id="update-spot-submit"
                >
                    Add Song
                </button>
            </form>
        </>
    )
}
