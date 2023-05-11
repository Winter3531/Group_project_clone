import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistDetailsFetch } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import Player from "../MusicPlayer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PlaylistDetails = () => {
    const dispatch = useDispatch();
    const playlist = useSelector(state=>state.playlists);
    const sessionUser = useSelector(state=>state.session.user);
    const [liked, setLike] = useState(false);
    const { playlistId } = useParams();


    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    const handleOnClick = async () => {
        await dispatch()
    }

    const playlistLikes = playlist.likable_id

    return (
        <>
        <div>
            <div>Playlist Id: {playlist.id}</div>
        </div>
        <div>
            <div>Playlist Owner Id: {playlist.owner_id}</div>
        </div>
        <div>
            <div>Playlist Name: {playlist.playlist_name}</div>
        </div>
        {playlistLikes && (
            <div>
                <div>Playlist Likes: {playlistLikes.length}</div>
            </div>
        )}
        <div>
            {sessionUser !== undefined && sessionUser.id === playlist.owner_id && (
                <OpenModalButton
                    buttonText="Edit Playlist"
                    modalComponent={<EditPlaylistModal />}
                />
            )}
        </div>
        <div>
            {sessionUser !== undefined && sessionUser.id === playlist.owner_id && (
                <OpenModalButton
                    buttonText="Delete Playlist"
                    modalComponent={<DeletePlaylistModal />}
                />
            )}
        </div>
        {sessionUser !== undefined && sessionUser.id !== playlist.owner_id && (
            <button type="button" onClick={handleOnClick}>Like</button>
        )}
        </>
    );
};


export default PlaylistDetails
