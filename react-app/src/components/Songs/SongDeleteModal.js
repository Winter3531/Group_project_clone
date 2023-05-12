import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteSongThunk } from "../../store/song";
import { getAlbumDetail } from "../../store/album";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SongDeleteModal({ songId, albumId }){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSongThunk(songId))
        await dispatch(getAlbumDetail(albumId))
        closeModal()
        history.push(`/albums/${albumId}`)
    }

    return (
        <>
            <div className="delete-confirmation-form">
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this song?</p>
                <div>
                    <button
                        onClick={handleDelete}
                    >
                        Yes
                    </button>
                    <button
                        onClick={closeModal}
                    >
                        No
                    </button>
                </div>
            </div>
        </>
    )
}
