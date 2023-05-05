import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAlbum } from "../../store/album";
import { useHistory } from "react-router-dom";

const EditAlbumForm = ({album}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(album, 'album in the edit album')
    const [album_name, setAlbumName] = useState(album);
    const [year_recorded, setYearRecorded] = useState("");
    const [album_img, setAlbumImg] = useState("");

    const updateAlbumName = (e) => setAlbumName(e.target.value);
    const updateYearRecorded = (e) => setYearRecorded(e.target.value);
    const updateAlbumImg = (e) => setAlbumImg(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newAlbum = {
            album_name,
            year_recorded,
            album_img,
        };


        let createdAlbum = await dispatch(editAlbum(newAlbum));
        if (createdAlbum) {
            history.push(`/albums/${createdAlbum.id}`)
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Album Name</div>
                    <input
                        type="text"
                        placeholder="Album Name"
                        required
                        value={album_name}
                        onChange={updateAlbumName} />
                </div>
                <div>
                    <div>Year Recorded</div>
                    <input
                        type="number"
                        placeholder="Year Recorded"
                        required
                        value={year_recorded}
                        onChange={updateYearRecorded} />
                </div>
                <div>
                    <div>Album Image</div>
                    <input
                        type="text"
                        placeholder="Album Image"
                        required
                        value={album_img}
                        onChange={updateAlbumImg} />
                </div>
                <button type="submit">Create new Album</button>

            </form>
        </section>
    )
}

export default EditAlbumForm;
