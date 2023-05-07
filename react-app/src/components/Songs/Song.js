import { useDispatch, useSelector } from "react-redux"

import OpenModalButton from "../OpenModalButton";
import SongAddModal from "./SongAddModal";

export default function SongsDisplay() {

    return (
        <>
            <h1>SONGS!</h1>
            <div>
                <OpenModalButton
                    buttonText="New Song"
                    modalComponent={<SongAddModal />}
                />
            </div>
        </>
    )
}
