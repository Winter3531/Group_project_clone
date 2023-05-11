import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistDetailsFetch } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";

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
        <div>
        {(playlist.songs ? playlist.songs?.map(song =>
                            <div>
                                {count += 1}. Name:{song.song_name}
                                length:{Math.floor(song.song_length / 60)}: {song.song_length % 60}
                                <OpenModalButton
                                buttonText="Remove Song"
                                modalComponent={<RemoveSongModal id={song.id}/>}/>
                            </div>)
                            : <div>No Songs </div>)}
        </div>
        <div>
            {playlistLikes && (
                <div>
                    <div>Playlist Likes: {playlistLikes.length}</div>
                </div>
            )}

            {playlist.likable_type == "playlist" ?
                <div className="like-input">
                    <div
                        className="true"
                        onClick={unlikeClick} >
                        <i className="fas fa-heart"></i>
                    </div>
                </div>
                :
                <div className="like-input">
                    <div
                        className="false"
                        onClick={likeClick} >
                        <i className="far fa-heart"></i>
                    </div>
                </div>
            }
        </div>
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
