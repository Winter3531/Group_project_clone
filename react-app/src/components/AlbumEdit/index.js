import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAlbum } from "../../store/album";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditAlbumForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { albumId } = useParams()
    const [album_name, setAlbumName] = useState("");
    const [year_recorded, setYearRecorded] = useState("");
    const [album_img, setAlbumImg] = useState("");

    const updateAlbumName = (e) => setAlbumName(e.target.value);
    const updateYearRecorded = (e) => setYearRecorded(e.target.value);
    const updateAlbumImg = (e) => setAlbumImg(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newAlbum = {
            id : albumId,
            album_name,
            year_recorded,
            album_img,
        };

        let updatedAlbum = await dispatch(editAlbum(newAlbum));
        if (updatedAlbum) {
            history.push(`/albums/${updatedAlbum.id}`)
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
