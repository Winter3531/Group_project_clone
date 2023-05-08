import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";

export default function SongAddModal(){
    const dispatch = useDispatch();

    return (
        <>
            <h1 className="new-song-modal-header">Add New Song</h1>
            <form className="new-song-modal-form"  >
                {/* <input
                    type="text"
                    value={song_name}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder={song_name}
                />
                <input
                    type="text"
                    value={song_src}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder={song_src}
                />
                <input
                    type="text"
                    value={song_length}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder={song_length}
                /> */}
            </form>
        </>
    )
}
