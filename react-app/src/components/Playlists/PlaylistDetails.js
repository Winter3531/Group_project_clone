import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PlaylistDetailsFetch } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";

const PlaylistDetails = () => {
    const dispatch = useDispatch();
    const playlist = useSelector(state=>state.playlists);
    const { playlistId } = useParams();


    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    return (
        <>
        <div>
            <div>{playlist.id}</div>
        </div>
        <div>
            <div>{playlist.owner_id}</div>
        </div>
        <div>
            <div>{playlist.playlist_name}</div>
        </div>
        <div>
            <li>
                <OpenModalButton
                    buttonText="Edit Playlist"
                    modalComponent={<EditPlaylistModal />}
                />
            </li>
        </div>
        </>
    );
};


export default PlaylistDetails
