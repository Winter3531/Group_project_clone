import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteSongThunk } from "../../store/song";

export default function SongDeleteModal({ songId }){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSongThunk(songId))
            .then(closeModal())
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
